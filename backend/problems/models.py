# models.py in your app

from django.db import models
from users.models import Users

class Problems(models.Model):
    user = models.ForeignKey(Users,on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    DIFFICULTY_CHOICES = (
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    )
    test_input= models.TextField()
    test_output= models.TextField(null=True)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
