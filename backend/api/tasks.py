import datetime
from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone
import pyotp
from django.conf import settings
from django.contrib.auth import get_user_model

User=get_user_model()
@shared_task
def send_otp(email):
            subject='your account verification email'
            totp = pyotp.TOTP('base32secret3232', interval=120,digits=4)
            otp_number=totp.now()
            user_obj=User.objects.get(email=email)
            print("i am sent otp",otp_number)
            message=f'Your otp Verification code  is {otp_number}'
            now=datetime.datetime.now()
            thereeminutes=datetime.timedelta(minutes=3)
           
            email_from=settings.EMAIL_HOST
            user_obj.otp=otp_number
            user_obj.otp_interval = 120
            user_obj.save()
            send_mail(subject,message,email_from,[email])
            return True