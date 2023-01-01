from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import exceptions
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login, logout
from api.models import Client, FreeLancer, Skills

User = get_user_model()
from rest_framework.parsers import JSONParser

# parser for file upload(here image)
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.response import Response
from .serializers import (
    UserSerializer,
    UserSerializerWithToken,
    RegistrationSerializer,
    UserUpdateSerializer,
    ClientProfileSerializer,
    FreelancerSerializer,
    SkillSerializer
)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        print(data)

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getUserPrfile(request):
    user = request.user

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


# freelancer register
class RegisterView(APIView):
    # permission_classes=[AllowAny]
    def post(self, request, format=None):

        serializer = RegistrationSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()
            data = serializer.data
            return Response(data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# freelancer Login
class LoginView(APIView):
    def post(self, request):
        if request.data.get("is_admin"):

            email = request.data["email"]
            passsword = request.data["password"]
            user = authenticate(email=email, password=passsword)

            if user is not None and user.is_superadmin:
                login(request, user)
                data = UserSerializerWithToken(user).data

                return Response(data, status=status.HTTP_200_OK)
            return Response(
                {"msg": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST
            )

        else:

            email = request.data["email"]
            passsword = request.data["password"]
            user = authenticate(email=email, password=passsword)

            if user is not None:
                login(request, user)
                data = UserSerializerWithToken(user).data

                return Response(data, status=status.HTTP_200_OK)
            return Response(
                {"msg": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST
            )


# for user details
class ClientDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        if request.data.get("is_admin"):

            if request.user.is_superadmin:
                user = User.objects.filter(is_superadmin=False, is_freelancer=False)

                serializer = UserSerializer(user, many=True)

                return Response(serializer.data, status=status.HTTP_200_OK)
            else:

                return Response(
                    {"details": "the user is not an admin"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        elif request.data.get("is_freelancer"):
            if request.user.is_superadmin:
                user = User.objects.filter(is_superadmin=False, is_freelancer=True)

                serializer = UserSerializer(user, many=True)

                return Response(serializer.data, status=status.HTTP_200_OK)
            else:

                return Response(
                    {"details": "the user is not an admin"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            user = User.objects.get(id=request.data["id"])

            if user is not None:
                serializer = UserSerializer(user)

                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# update client
class ClientUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    # profile update
    def put(self, request):
        user = User.objects.get(pk=request.data["id"])

        if user is not None:
            serializer = UserUpdateSerializer(
                instance=user, data=request.data, partial=True
            )

            if serializer.is_valid(raise_exception=True):
                serializer.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # profile picture update
    def patch(self, request, format=None):

        user = User.objects.get(pk=request.data["id"])

        userprofile = Client.objects.get(user=user)

        serializer = ClientProfileSerializer(instance=userprofile, data=request.data)
        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FreelancerUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    # profile update
    def put(self, request):

        user = User.objects.get(pk=request.data["id"])
        freelancer_profile = FreeLancer.objects.get(user=user)

        if user is not None:
            serializer = FreelancerSerializer(
                instance=freelancer_profile, data=request.data, partial=True
            )

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                serializernew = UserSerializer(user)
                return Response(serializernew.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#skill create and update
class SkillsView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        serializer=SkillSerializer(data=request.data, context={
        'request': request
    })
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response({"details":"created"},status=status.HTTP_201_CREATED)
        print(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors,status=status.HTTP_201_CREATED)
    def get(self,request):
        user=request.user

        freelancer=FreeLancer.objects.get(user=user)
     
        skills=Skills.objects.filter(user=freelancer)
        #skills may be multiple objets
        #so we need to use many= True to serialize that object
        serializer=SkillSerializer(skills,many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)
    def put(self,request):
        freelancer=FreeLancer.objects.get(user=request.user)
        serializer=SkillSerializer(instance=freelancer,data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response({"details":"updated"},status=status.HTTP_200_OK)

# logout


@api_view(["POST"])
def LogOut(request):
    print(request.user)
    logout(request)

    return Response({"msg": "successfully logged out"}, status=status.HTTP_200_OK)


# block and unblock
class BlockUnblockView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = User.objects.get(id=request.data["newid"])
        if user is not None and user.is_active == True:
            user.is_active = False
            user.save()

            return Response({"details": "user blocked"}, status=status.HTTP_200_OK)
        else:
            user.is_active = True
            user.save()

            return Response({"details": "user unblocked"}, status=status.HTTP_200_OK)
