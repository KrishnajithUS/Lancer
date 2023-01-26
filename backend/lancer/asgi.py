"""
ASGI config for lancer project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lancer.settings")

import django
django.setup()

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lancer.settings")
django_asgi_app = get_asgi_application()
from django_channels_jwt_auth_middleware.auth import JWTAuthMiddlewareStack

# from channels.auth import AuthMiddlewareStack
import chat.routing
# from chat.consumers import ChatConsumer



application = ProtocolTypeRouter(
    {

   "http":django_asgi_app,
   "websocket": AllowedHostsOriginValidator(
            JWTAuthMiddlewareStack(URLRouter(chat.routing.websocket_urlpatterns)))
    }
)


