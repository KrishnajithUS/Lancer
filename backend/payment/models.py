from django.db import models
from django.db.models.fields import CharField
from django.utils.translation import gettext_lazy as _
from api.models import FreeLancer,Category,SubCategory
from .constants import PaymentStatus
def upload_to(instance, filename):
    return "{filename}".format(filename=filename)
class Packages(models.Model):
    title=models.CharField(max_length=200,blank=True,null=True)
    no_of_posts=models.IntegerField(blank=True,null=True,default=0)
    price=models.IntegerField(default=None,blank=True,null=True)
    description=models.CharField(max_length=200,blank=True,null=True)
    def __str__(self):
        return  self.title
class RazorpayPayment(models.Model):
    Freelancer = models.ForeignKey(FreeLancer,on_delete=models.CASCADE,default=None)
    
    amount = models.FloatField(_("Amount"), null=False, blank=False)
    status = CharField(
        _("Payment Status"),
        default=PaymentStatus.PENDING,
        max_length=254,
        blank=False,
        null=False,
    )
    provider_order_id = models.CharField(
        _("Order ID"), max_length=40, null=False, blank=False
    )
    payment_id = models.CharField(
        _("Payment ID"), max_length=36, null=False, blank=False
    )
    signature_id = models.CharField(
        _("Signature ID"), max_length=128, null=False, blank=False
    )

    def __str__(self):
        return f"{self.id}-{self.Freelancer.user.first_name}-{self.status}"

class CreatePost(models.Model):
    Freelancer=models.ForeignKey(FreeLancer,on_delete=models.CASCADE,default=None)
    post_count=models.IntegerField(default=None,blank=True,null=True)
   
    category=models.ForeignKey(Category,on_delete=models.CASCADE,default=None,blank=True,null=True)
    sub_category=models.ForeignKey(SubCategory,on_delete=models.CASCADE,default=None,blank=True,null=True)
    specialization=models.CharField(max_length=200,blank=True,null=True)
    title=models.CharField(max_length=30,blank=True,null=True)
    cover_image=models.ImageField(upload_to=upload_to,blank=True,null=True)
    description=models.TextField(max_length=800,blank=True,null=True)
    keyfeatures=models.CharField(max_length=200,blank=True,null=True)
    price=models.IntegerField(default=None,blank=True,null=True)
    is_completed = models.BooleanField(default=False)
class FreelancerPost(models.Model):
      Freelancer = models.ForeignKey(FreeLancer,on_delete=models.CASCADE,default=None)
      package=models.ForeignKey(Packages,on_delete=models.CASCADE,default=None)
      payment=models.ForeignKey(RazorpayPayment,on_delete=models.CASCADE,default=None)
      status=models.BooleanField(default=False)

