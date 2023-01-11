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
from api.models import Client, Education, FreeLancer, Skills, Experience,CreatePost,Category,SubCategory 
from .emails import verify_token
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
import asyncio
from asgiref.sync import sync_to_async
from .tasks import send_otp

User = get_user_model()
from rest_framework.parsers import JSONParser

# parser for file upload(here image)
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.response import Response
from .serializers import (
    ExpSerializer,
    UserSerializer,
    UserSerializerWithToken,
    RegistrationSerializer,
    UserUpdateSerializer,
    ClientProfileSerializer,
    FreelancerSerializer,
    SkillSerializer,
    EduSerializer,
    PostSerializer,
    CategorySerializer,
    SubCategorySerializer
    
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

        if request.data.get("verification"):

            user = User.objects.get(pk=request.data["id"])

            new = verify_token(user, request.data["otp"])
            if new:
                user.is_active = True
                return Response(
                    {"details": "Account Activated Login to Continue"},
                    status=status.HTTP_201_CREATED,
                )

            else:
                return Response(
                    {"details": "Otp doesn't Match / TimeOut"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            serializer = RegistrationSerializer(data=request.data)
            if serializer.is_valid():

                serializer.save()
                print(serializer.data["email"])
                try:
                  send_otp.delay((request.data.get("email")))
                except:
                    pass
                data = serializer.data
                print(data)
                return Response(
                    {
                        "details": "check your email for verification",
                        "id": serializer.data["id"],
                    },
                    status=status.HTTP_201_CREATED,
                )

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# freelancer Login
class LoginView(APIView):
    def post(self, request):
        email = request.data["email"]
        passsword = request.data["password"]
        user = authenticate(email=email, password=passsword)

        if request.data.get("is_admin"):

            if user is not None and user.is_superadmin:
                login(request, user)
                data = UserSerializerWithToken(user).data

                return Response(data, status=status.HTTP_200_OK)
            return Response(
                {"msg": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST
            )

        else:

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
        print(request.data)

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

    # profile picture update
    def patch(self, request, format=None):
        print(request.data)
        user = User.objects.get(pk=request.data["id"])

        userprofile = FreeLancer.objects.get(user=user)

        serializer = FreelancerSerializer(
            instance=userprofile, data=request.data, partial=True
        )
        if serializer.is_valid():

            serializer.save()
            serializer.save()
            serializernew = UserSerializer(user)
            return Response(serializernew.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# skill create and update
class SkillsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        if request.data.get("is_delete"):
            skills = Skills.objects.get(pk=request.data["id"])
            print(skills)
            skills.delete()
            return Response(
                {"details": "deleted successfully"}, status=status.HTTP_200_OK
            )
        serializer = SkillSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response({"details": "created"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_201_CREATED)

    def get(self, request):
        user = request.user

        freelancer = FreeLancer.objects.get(user=user)

        skills = Skills.objects.filter(user=freelancer)
        # skills may be multiple objets
        # so we need to use many= True to serialize that object
        serializer = SkillSerializer(skills, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        print(request.data)
        skills = Skills.objects.get(pk=request.data["id"])
        print("skills", skills)
        serializer = SkillSerializer(instance=skills, data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response({"details": "updated"}, status=status.HTTP_200_OK)
        return Response(serializer.errors)


# Experience
class ExperienceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.data)
        if request.data.get("is_delete"):
            experience = Experience.objects.filter(pk=request.data["id"])

            experience.delete()
            return Response(
                {"details": "deleted successfully"}, status=status.HTTP_200_OK
            )
        serializer = ExpSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()

            return Response({"details": "created"}, status=status.HTTP_201_CREATED)

        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user = request.user

        freelancer = FreeLancer.objects.get(user=user)

        experience = Experience.objects.filter(user=freelancer)
        # skills may be multiple objets
        # so we need to use many= True to serialize that object
        serializer = ExpSerializer(experience, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        print(request.data)
        freelancer = FreeLancer.objects.get(user=request.user)
        experience = Experience.objects.get(pk=request.data["id"], user=freelancer)
        # country=request.data.get('bcountry')
        # experience.country=country

        print(experience)
        serializer = ExpSerializer(instance=experience, data=request.data, many=False)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response({"details": "updated"}, status=status.HTTP_200_OK)
        return Response(serializer.errors)


# Education
class EducationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.data)
        if request.data.get("is_delete"):
            education = Education.objects.filter(pk=request.data["id"])

            education.delete()
            return Response(
                {"details": "deleted successfully"}, status=status.HTTP_200_OK
            )
        serializer = EduSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()

            return Response({"details": "created"}, status=status.HTTP_201_CREATED)

        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user = request.user

        freelancer = FreeLancer.objects.get(user=user)

        education = Education.objects.filter(user=freelancer)
        # skills may be multiple objets
        # so we need to use many= True to serialize that object
        serializer = EduSerializer(education, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        print(request.data)
        freelancer = FreeLancer.objects.get(user=request.user)
        education = Education.objects.get(pk=request.data["id"], user=freelancer)

        serializer = EduSerializer(instance=education, data=request.data, many=False)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response({"details": "updated"}, status=status.HTTP_200_OK)
        return Response(serializer.errors)

#Post
class PostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        
        if request.data.get("get_category"):
            category=Category.objects.all()
            serializer=CategorySerializer(category,many=True)
          
            return Response(serializer.data,status=status.HTTP_200_OK)
        if request.data.get("get_sub_category"):
            category=Category.objects.get(pk=request.data.get('category'))
         
            subcategory=SubCategory.objects.filter(subcategory=category)
          
            serializer=SubCategorySerializer(subcategory,many=True)
          
            return Response(serializer.data,status=status.HTTP_200_OK)
            
        if request.data.get("is_delete"):
            post = CreatePost.objects.filter(pk=request.data["id"])

            post.delete()
            return Response(
                {"details": "deleted successfully"}, status=status.HTTP_200_OK
            )
        if request.data.get("is_update"):
            user = request.user

            freelancer = FreeLancer.objects.get(user=user)

            post = CreatePost.objects.get(pk=request.data["id"],user=freelancer)
            # skills may be multiple objets
            # so we need to use many= True to serialize that object
            serializer = PostSerializer(post, many=False)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)

       
        print('request comes here',request.data)
        serializer = PostSerializer(data=request.data, context={"request": request})
        print(serializer)

        if serializer.is_valid():
            serializer.save()

            return Response({"details": "created"}, status=status.HTTP_201_CREATED)

        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user = request.user

        freelancer = FreeLancer.objects.get(user=user)

        post = CreatePost.objects.filter(user=freelancer)
        # skills may be multiple objets
        # so we need to use many= True to serialize that object
        serializer = PostSerializer(post, many=True)
      
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        print(request.data)
        freelancer = FreeLancer.objects.get(user=request.user)
        post = CreatePost.objects.get(pk=request.data["id"], user=freelancer)

        serializer = PostSerializer(instance=post, data=request.data, many=False)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response({"details": "updated"}, status=status.HTTP_200_OK)
        return Response(serializer.errors)
#Public Profile data
class PublicProfileView(APIView):
    permission_classes=[IsAuthenticated]

        
    def post(self,request):
        print(request.data)
        user=User.objects.get(pk=request.data.get("id"))
        print(user)
        freelancer=FreeLancer.objects.get(user=user)   
        print(freelancer)
        if freelancer is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer=FreelancerSerializer(freelancer)
        print(serializer.data)
        return Response(serializer.data,status=status.HTTP_200_OK)
# get all posts
class setPagination(PageNumberPagination):
    page_size=2
class GetAllPostView(ListAPIView):
    queryset=CreatePost.objects.all()
    serializer_class=PostSerializer
    pagination_class=setPagination
    
    # def get(self,request):
    #     print(request.data)
    #     posts=CreatePost.objects.all()
    #     print(posts)
    #     serializer=PostSerializer(posts,many=True)
    #     print(serializer.data)
    #     return Response(serializer.data,status=status.HTTP_200_OK) 
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
