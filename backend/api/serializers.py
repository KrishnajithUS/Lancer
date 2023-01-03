from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Client, FreeLancer,Skills
from django.contrib.auth import get_user_model, authenticate
from rest_framework import exceptions

User = get_user_model()

# this is for normal user creation using function based views
# we create the profile inside that function based views

class UserSerializer(serializers.ModelSerializer):
    profile_picture=serializers.ImageField(source='client.profile_picture',read_only=True,required=False)
    fprofile_picture=serializers.ImageField(source='freelancer.profile_picture',read_only=True,required=False)
    title=serializers.CharField(source='freelancer.title',read_only=True,required=False)
    social_media=serializers.CharField(source='freelancer.social_media_links',read_only=True,required=False)
    bio=serializers.CharField(source='freelancer.bio',read_only=True,required=False)
    class Meta:
        model=User
        fields=['id','username','is_active','first_name',"last_name","email","profile_picture","bio","fprofile_picture","title","social_media"]
        
# this is for freelancer user and profile creation
# creating serializer associated with the user
class ClientProfileSerializer(serializers.ModelSerializer):
    profile_picture=serializers.ImageField(required=False)
    class Meta:
        model = Client
        fields = ["profile_picture"]

class UserUpdateSerializer(serializers.ModelSerializer):
    profile_picture=serializers.ImageField(source='client.profile_picture',read_only=True,required=False)
    first_name = serializers.CharField(required=False,allow_null=True,allow_blank=True)
    last_name = serializers.CharField(required=False,allow_null=True,allow_blank=True)
    email = serializers.CharField(required=False,allow_null=True,allow_blank=True)
    password = serializers.CharField(required=False,allow_null=True,allow_blank=True,write_only=True)
    new_password = serializers.CharField(required=False,allow_null=True,allow_blank=True,write_only=True)
    confirm_new_password = serializers.CharField(required=False,allow_null=True,allow_blank=True,write_only=True)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "password",
            "new_password",
            "confirm_new_password",
            'profile_picture'
          
        ]


        partial=True
 
    def update(self, instance, validated_data):
        print("update instance",instance)
        
        password=validated_data.get("password",None)
        new_password = validated_data.get("new_password", None)
        first_name=validated_data.get("first_name",None)
        print(first_name)
        last_name=validated_data.get("last_name",None)
        email=validated_data.get("email",None)
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
        
        instance.save()
        return instance
class FreelancerSerializer(serializers.ModelSerializer):
    user=UserUpdateSerializer(many=False,required=False)
    class Meta:
        model=FreeLancer
        fields=["user","title","profile_picture","bio","social_media_links"]
        partial=True
    def update(self,instance,validated_data):
        try:
           user_data=validated_data.pop('user')
        except:
            pass
        if validated_data.get("title",None):
            instance.title=validated_data.get("title",instance.title)
        if validated_data.get("bio",None):
            instance.bio=validated_data.get("bio",instance.bio)
        if validated_data.get("social_media_links",None):
            instance.social_media_links=validated_data.get("social_media_links",instance.bio)
        if validated_data.get("profile_picture",None):
            instance.profile_picture=validated_data.get("profile_picture",instance.profile_picture)
        instance.save()
        #pop out the data from user dictionary
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
        fields = ["username","first_name", "last_name", "email", "password", "is_freelancer"]
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
        user.is_active = True
        username=validated_data["email"].split("@")[0]
        user.username=username
        user.save()
        if user.is_freelancer:
            FreeLancer.objects.create(user=user)
        else:
            Client.objects.create(user=user)
        
        

        return user
#freelancer skills serializer
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Skills
        fields=['id','skills']
    def create(self, validated_data):
        freelancer=FreeLancer.objects.get(user=self.context['request'].user)
        skills=Skills(user=freelancer,skills=validated_data["skills"])
        skills.save()
        return skills
    def update(self,instance,validated_data):
        if validated_data.get("skills",None):
            instance.skills = validated_data.get("skills",instance.skills)
        instance.save()
        return instance
    
    