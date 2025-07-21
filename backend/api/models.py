from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    selected_avatar = models.CharField(max_length=20, blank=True, null=True)
    account_type = models.CharField(max_length=50, blank=True, null=True)
    # Add more fields as needed

    def __str__(self):
        return f"Profile of {self.user.username}"
