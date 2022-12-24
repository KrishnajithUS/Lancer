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

User = get_user_model()
from rest_framework.parsers import JSONParser
#parser for file upload(here image)
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer, UserSerializerWithToken, RegistrationSerializer,UserUpdateSerializer


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
    print(user)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


# freelancer register
class RegisterView(APIView):
    # permission_classes=[AllowAny]
    def post(self, request, format=None):
        print(request.data)
        serializer = RegistrationSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():


            serializer.save()
            data = serializer.data
            return Response(data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# freelancer Login
class LoginView(APIView):
    def post(self, request):
        print(request.data)
        email = request.data["email"]

        passsword = request.data["password"]
        user = authenticate(email=email, password=passsword)

        if user is not None:
            login(request, user)
            data = UserSerializerWithToken(user).data

            print(data)
            return Response(data, status=status.HTTP_200_OK)
        return Response(
            {"msg": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST
        )

#for user details
class  ClientDetailsView(APIView):
    def post(self,request):
        print(request.data["id"])
        user=User.objects.get(id=request.data["id"])
        print(user)
        if user is not None:
            serializer=UserSerializer(user)
            print(serializer.data)
  
            return Response(serializer.data,status=status.HTTP_200_OK)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
#update client
class ClientUpdateView(APIView):
    parser_classes=(MultiPartParser,FormParser)
    permission_classes=[IsAuthenticated]
    def put(self,request):
        user=User.objects.get(pk=request.data["id"])
        print("user",user)
        if user is not None:
            serializer=UserUpdateSerializer(instance=user,data=request.data,partial=True)
            print("serializer",serializer)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                print(serializer.data)
                return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


# logout
# def post(self,request):
#     logout(request)

#     request Response({'msg':'successfully logged out'},status=status.HTTP_200_OK)
