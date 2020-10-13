from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    name = models.CharField(max_length=50,null=False)
    emails = models.CharField(max_length=250, unique=True)
      
    username = None
    USERNAME_FIELD = 'emails'
    
    REQUIRED_FIELDS = [] # might be helpful in future
         
    phone = models.CharField(max_length=20, blank=True,null=True)
    gender = models.CharField(max_length=20, blank=True,null=True)

    session_token = models.CharField(max_length=10, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
