from django.core.mail import send_mail
from django.core.mail import EmailMessage
import random
import asyncio
from django.utils import timezone
import pyotp
import time
import datetime
from django.conf import settings
from django.contrib.auth import get_user_model

User=get_user_model()

def send_otp(email):
            subject='your account verification email'
            totp = pyotp.TOTP('base32secret3232', interval=120,digits=4)
            otp_number=totp.now()
            user_obj=User.objects.get(email=email)
            print("i am sent otp",otp_number)
            message=f'Your otp is {otp_number}'
            now=datetime.datetime.now()
            thereeminutes=datetime.timedelta(minutes=3)
           
            email_from=settings.EMAIL_HOST
            user_obj.otp=otp_number
            user_obj.otp_interval = 120
            user_obj.save()
            send_mail(subject,message,email_from,[email])
            return True
        
            
           
            


def verify_token(user, token):
    print(user)
    print(user.otp)
    print(user.expiration_time)
    if user.expiration_time < timezone.now():
        return False
    if user.otp == token:
        # verify the token using the TOTP.verify method
        user.otp=None
        user.is_active=True
        user.save()
        return True
    else :
        return False


