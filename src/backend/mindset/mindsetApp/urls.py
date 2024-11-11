from django.urls import path, include
from django.views.generic import RedirectView
from .views import auth, views

#auth
urlpatterns = [
    path('api/auth/login', auth.Login.as_view(), name='login'),
    path('api/auth/registration', auth.Registration.as_view(), name='registration'),
    path('api/auth/logout', auth.Logout.as_view(), name="logout"),
]

#other
urlpatterns += [
    path('api/csrf/', views.get_csrf, name='api-csrf'),
]
