from .models import Client,FreeLancer,Packages,Skills,Experience,Education,CreatePost,Category,SubCategory
from django.contrib import admin

from django.utils.html import format_html
class ClientAdmin(admin.ModelAdmin):
    def thumbnail(self,object):
        return format_html('<img src="{}" width="30" style="border_radius:50%;">)'.format(object.profile_picture.url))
   
 
admin.site.register(Client,ClientAdmin)
admin.site.register(FreeLancer)
admin.site.register(Skills)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(CreatePost)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Packages)