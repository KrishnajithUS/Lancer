from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Client, CreatePost, Education, FreeLancer, Skills, Experience,Category,SubCategory
from django.contrib.auth import get_user_model, authenticate
from rest_framework import exceptions
import hashlib
from .emails import send_otp

User = get_user_model()

# this is for normal user creation using function based views
# we create the profile inside that function based views
# unique username creator
def generate_username(email):
    # Split the email address into the username and domain
    username, domain = email.split("@")

    # Generate a unique number for the username
    unique_number = generate_unique_number(username)

    # Return the username with the unique number appended
    return username + str(unique_number)


def generate_unique_number(username):
    # Hash the username to create a unique ID
    hashed_username = hashlib.sha1(username.encode("utf-8")).hexdigest()

    # Convert the hash to an integer
    unique_number = int(hashed_username, 16)

    # Return the unique number
    return unique_number


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(
        source="client.profile_picture", read_only=True, required=False
    )
    fprofile_picture = serializers.ImageField(
        source="freelancer.profile_picture", read_only=True, required=False
    )
    title = serializers.CharField(
        source="freelancer.title", read_only=True, required=False
    )
    social_media = serializers.CharField(
        source="freelancer.social_media_links", read_only=True, required=False
    )
    bio = serializers.CharField(source="freelancer.bio", read_only=True, required=False)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "is_active",
            "first_name",
            "last_name",
            "email",
            "profile_picture",
            "bio",
            "fprofile_picture",
            "title",
            "social_media",
        ]


# this is for freelancer user and profile creation
# creating serializer associated with the user
class ClientProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = Client
        fields = ["profile_picture"]


class UserUpdateSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(
        source="client.profile_picture", read_only=True, required=False
    )
    username = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    first_name = serializers.CharField(
        required=False, allow_null=True, allow_blank=True
    )
    last_name = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    email = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    password = serializers.CharField(
        required=False, allow_null=True, allow_blank=True, write_only=True
    )
    new_password = serializers.CharField(
        required=False, allow_null=True, allow_blank=True, write_only=True
    )
    confirm_new_password = serializers.CharField(
        required=False, allow_null=True, allow_blank=True, write_only=True
    )

    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "new_password",
            "confirm_new_password",
            "profile_picture",
        ]

        partial = True

    def update(self, instance, validated_data):
        print("update instance", instance)

        password = validated_data.get("password", None)
        new_password = validated_data.get("new_password", None)
        first_name = validated_data.get("first_name", None)
        username=validated_data.get("username",None)
        print(first_name)
        last_name = validated_data.get("last_name", None)
        email = validated_data.get("email", None)
        if new_password and password:

            if not instance.check_password(password):
                raise serializers.ValidationError({"old_passord": "Incorrect password"})

            confirm_new_passord = validated_data.get("confirm_new_password", None)
            if new_password != confirm_new_passord:
                raise serializers.ValidationError(
                    {"new_password": "password did not match"}
                )
            instance.set_password(new_password)
        if first_name:
            instance.first_name = validated_data.get("first_name", instance.first_name)

        if last_name:
            instance.last_name = validated_data.get("last_name", instance.last_name)
        if email:
            instance.email = validated_data.get("email", instance.email)
        if username:
            instance.username=validated_data.get("username",instance.username)
        instance.save()
        return instance


class FreelancerSerializer(serializers.ModelSerializer):
    user = UserUpdateSerializer(many=False, required=False)

    class Meta:
        model = FreeLancer
        fields = ["user", "title", "profile_picture", "bio", "social_media_links"]
        partial = True

    def update(self, instance, validated_data):
        try:
            user_data = validated_data.pop("user")
        except:
            pass
        if validated_data.get("title", None):
            instance.title = validated_data.get("title", instance.title)
        if validated_data.get("bio", None):
            instance.bio = validated_data.get("bio", instance.bio)
        if validated_data.get("social_media_links", None):
            instance.social_media_links = validated_data.get(
                "social_media_links", instance.bio
            )
        if validated_data.get("profile_picture", None):
            instance.profile_picture = validated_data.get(
                "profile_picture", instance.profile_picture
            )
        instance.save()
        # pop out the data from user dictionary
        try:
            user = UserUpdateSerializer(instance=instance.user, data=user_data)

            user.is_valid(raise_exception=True)
            user.save()
        except:
            pass
        return instance


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["token", "id", "is_freelancer"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        context = {"refresh": str(token), "access": str(token.access_token)}
        return context


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "is_freelancer",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):

        user = User(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
        )
        if validated_data["is_freelancer"]:
            user.is_freelancer = True
        else:
            user.is_freelancer = False
        user.set_password(validated_data["password"])
        user.is_active = False
        username = generate_username(validated_data["email"])
        user.username = username
        user.save()

        if user.is_freelancer:
            FreeLancer.objects.create(user=user)
        else:
            Client.objects.create(user=user)

        return user


# freelancer skills serializer
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ["id", "skills"]

    def create(self, validated_data):
        freelancer = FreeLancer.objects.get(user=self.context["request"].user)
        skills = Skills(user=freelancer, skills=validated_data["skills"])
        skills.save()
        return skills

    def update(self, instance, validated_data):
        if validated_data.get("skills", None):
            instance.skills = validated_data.get("skills", instance.skills)
        instance.save()
        return instance


class ExpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "id",
            "company",
            "place",
            "country",
            "is_currently_working",
            "no_of_years",
            "description",
        ]

    def create(self, validated_data):
        freelancer = FreeLancer.objects.get(user=self.context["request"].user)
        experience = Experience(user=freelancer, **validated_data)
        experience.save()
        return experience

    def update(self, instance, validated_data):
        print("hoi")
        if validated_data.get("company", None):
            instance.company = validated_data.get("company", instance.company)
        if validated_data.get("place", None):
            instance.place = validated_data.get("place", instance.place)
        if validated_data.get("country", None):
            instance.country = validated_data.get("country", instance.country)
        if validated_data.get("is_currently_working", None):
            instance.is_currently_working = validated_data.get(
                "is_currently_working", instance.is_currently_working
            )
        if validated_data.get("no_of_years", None):
            instance.no_of_years = validated_data.get(
                "no_of_years", instance.no_of_years
            )
        if validated_data.get("description", None):
            instance.description = validated_data.get(
                "description", instance.description
            )

        instance.save()
        return instance


class EduSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ["id", "university", "degree", "field_of_study"]

    def create(self, validated_data):
        freelancer = FreeLancer.objects.get(user=self.context["request"].user)
        education = Education(user=freelancer, **validated_data)
        education.save()
        return education

    def update(self, instance, validated_data):
        print("hoi")
        if validated_data.get("university", None):
            instance.university = validated_data.get("university", instance.university)
        if validated_data.get("degree", None):
            instance.degree = validated_data.get("degree", instance.degree)
        if validated_data.get("field_of_study", None):
            instance.field_of_study = validated_data.get(
                "field_of_study", instance.field_of_study
            )

        instance.save()
        return instance
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=["id","category_name"]
class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=SubCategory
        fields=["id","subcategory_name"]
class PostSerializer(serializers.ModelSerializer):
    categorydata = serializers.CharField(
    source="category.category_name", read_only=True, required=False
)
    subcategorydata = serializers.CharField(
source="sub_category.subcategory_name", read_only=True, required=False
)

    class Meta:
        model = CreatePost
        fields = ["id","category","sub_category","id","specialization","title", "cover_image","price","description","keyfeatures","subcategorydata","categorydata"]

    def create(self, validated_data):
        print("crerte method",validated_data)
        freelancer = FreeLancer.objects.get(user=self.context["request"].user)
        # category=Category.objects.get(pk=validated_data['category'])
        # subcategory=SubCategory.objects.get(pk=validated_data['sub_category'],subcategory=category)
        post=CreatePost(user=freelancer,category=validated_data['category'],sub_category=validated_data['sub_category'],title=validated_data["title"],cover_image=validated_data["cover_image"],specialization=validated_data["specialization"],description=validated_data["description"],keyfeatures=validated_data["keyfeatures"],price=validated_data["price"])
        post.save()
        return post

    # def update(self, instance, validated_data):
    #     print("hoi")
    #     # if validated_data.get("title", None):
    #     #     instance.title = validated_data.get("title", instance.title)
    #     # if validated_data.get("cover_image", None):
    #     #     instance.cover_image = validated_data.get("cover_image", instance.cover_image)
    #     # if validated_data.get("description", None):
    #     #     instance.description = validated_data.get(
    #     #         "description", instance.description
    #     #     )
    #     # if validated_data.get("price", None):
    #     #     instance.price = validated_data.get(
    #     #         "price", instance.price
    #     #     )
    #     print(validated_data)
    #     instance(**validated_data)
    #     instance.save()
    #     return instance



