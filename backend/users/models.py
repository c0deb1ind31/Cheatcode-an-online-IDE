# models.py in your app
import uuid
from django.db import models

class Users(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    gid=models.TextField(unique=True, null=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    reputation = models.IntegerField(default=0)
    registration_date = models.DateTimeField(auto_now_add=True)