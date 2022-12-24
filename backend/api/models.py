from Account.models import User
from django.db import models
from django_countries.fields import CountryField
#explicitly set upload path and filename
def upload_to(instance,filename):
    return 'image/{filename}'.format(filename=filename)
class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to=upload_to,blank=True,null=True)

    def __str__(self):
        return self.user.first_name

#freelancer and related model creation
class FreeLancer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(blank=True)

    def __str__(self):
        return self.user.first_name
class Skills(models.Model):
    name=models.CharField(max_length=50)
    def __str__(self):
        return self.name
class Experience(models.Model):
    company=models.CharField(max_length=70)
    location=models.CharField(max_length=60)
    country=CountryField(blank=True)
    is_currently_working=models.BooleanField(default=False)
    no_of_years=models.IntegerField()
    description=models.TextField(max_length=100)
    def __str__(self):
        return self.company
class Education(models.Model):
    pass
class FreelancerBio(models.Model):
    pass
class CreatePost(models.Model):
    pass