from django.db import models
from api.models import FreeLancer,Client

class Messages(models.Model):
    client=models.ForeignKey(Client,related_name='client_messages',on_delete=models.CASCADE)
    freelancer=models.ForeignKey(FreeLancer,related_name='client_messages',on_delete=models.CASCADE)
    content=models.TextField()
    timestamp=models.DateTimeField(auto_now_add=True)
    def last_10_messages(self):
        return Messages.objects.order_by('-timestamp').all()[:10]