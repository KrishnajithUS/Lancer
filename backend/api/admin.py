from .models import Client
from django.contrib import admin

from django.utils.html import format_html
class ClientAdmin(admin.ModelAdmin):
    def thumbnail(self,object):
        return format_html('<img src="{}" width="30" style="border_radius:50%;">)'.format(object.profile_picture.url))
   
 
admin.site.register(Client,ClientAdmin)
