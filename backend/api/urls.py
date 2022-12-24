from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path("register/", views.RegisterView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("cprofileData/", views.ClientDetailsView.as_view(), name="client_update_view"),
    path("cupdate/", views.ClientUpdateView.as_view(), name="client_update_view"),
    path("users/profile/", views.getUserPrfile, name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
