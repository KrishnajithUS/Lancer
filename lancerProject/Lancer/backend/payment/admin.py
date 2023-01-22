from django.contrib import admin
from .models import RazorpayPayment,Packages,CreatePost,FreelancerPost
# Register your models here.
admin.site.register(RazorpayPayment)
admin.site.register(Packages)
admin.site.register(CreatePost)
admin.site.register(FreelancerPost)