from django.urls import path, include
from django.views.generic import RedirectView
from .views import auth
urlpatterns = [
    path('api/auth/login', auth.Login.as_view(), name='login'),
    path('api/auth/registration', auth.Registration.as_view(), name='registration'),
]
