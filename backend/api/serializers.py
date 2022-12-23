from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Client, FreeLancer
from django.contrib.auth import get_user_model, authenticate
from rest_framework import exceptions

User = get_user_model()

# this is for normal user creation using function based views
# we create the profile inside that function based views


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "email"]


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["token","id","is_freelancer"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        context = {"refresh": str(token), "access": str(token.access_token)}
        return context


# this is for freelancer user and profile creation
# creating serializer associated with the user
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "password","is_freelancer"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
        )
        if validated_data["is_freelancer"]:
            user.is_freelancer=True
        else:
            user.is_freelancer=False
        user.set_password(validated_data["password"])
        user.is_active = True

        user.save()

        return user

