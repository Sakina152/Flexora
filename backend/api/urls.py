from django.urls import path
from .views import hello, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('hello/', hello),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
]
