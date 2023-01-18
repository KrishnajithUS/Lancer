from Account.models import User
from django.db import models

# explicitly set upload path and filename
def upload_to(instance, filename):
    return "{filename}".format(filename=filename)
#otp model

class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to=upload_to, blank=True, null=True)
    bio=models.CharField(max_length=50,blank=True)
    def __str__(self):
        return self.user.first_name

class FreeLancer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    title=models.CharField(max_length=20,blank=True,null=True)
    profile_picture = models.ImageField(upload_to=upload_to,blank=True)
    bio = models.CharField(max_length=200,blank=True,null=True)
    is_package_active=models.BooleanField(default=False)
    post_count=models.IntegerField(blank=True,null=True)
    social_media_links=models.CharField(max_length=40,blank=True,null=True)
    
    
    def __str__(self):
        return self.user.first_name
class Education(models.Model):
    user = models.ForeignKey(FreeLancer, on_delete=models.CASCADE,default=None)
    university = models.CharField(max_length=30, blank=True)
    degree = models.CharField(max_length=30, blank=True)
    field_of_study = models.CharField(max_length=20, blank=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.university
class Experience(models.Model):
    user = models.ForeignKey(FreeLancer, on_delete=models.CASCADE,null=True,blank=True,default=None)

    company = models.CharField(max_length=70,blank=True,null=True)
    place = models.CharField(max_length=60,blank=True,null=True)
    country = models.CharField(max_length=30, blank=True,null=True)
    is_currently_working = models.BooleanField(default=False,null=True)
    no_of_years = models.IntegerField(blank=True,null=True)
    description = models.TextField(max_length=100, blank=True,null=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.place




class Skills(models.Model):
      user=models.ForeignKey(FreeLancer,on_delete=models.CASCADE,default=None)
      skills=models.CharField(max_length=20,blank=True,null=True,unique=True)
      def __str__(self):
          return self.skills

class Category(models.Model):
   
    category_name=models.CharField(max_length=30,blank=True,null=True)
    def __str__(self):
        return self.category_name
class SubCategory(models.Model):
    subcategory=models.ForeignKey(Category,on_delete=models.CASCADE,default=None)
    subcategory_name=models.CharField(max_length=30,null=True,blank=True)
    def __str__(self):
        return self.subcategory_name


    # def __str__(self):
    #     return self.title


#connection model 
# class Connection(models.Model):
#     freelancer=models.OneToOneField(FreeLancer,on_delete=models.CASCADE,default=None)
#     connections=models.ManyToManyField(Client,blank=True,related_name="connections")
#     def __str__(self):
#         return self.freelancer.user.username
#     def add_connection(self,account):
#         if not account in self.connections.all():
#             self.connections.add(account)
           
#     def remove_connection(self,account):
#         if account in self.connections.all():
#             self.connections.remove(account)


    






