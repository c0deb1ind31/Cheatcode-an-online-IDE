# models.py in your app
import uuid
from django.db import models

class Submissions(models.Model):
    submission_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.CharField(max_length=100)
    problem_id = models.IntegerField()
    submitted_at = models.DateField()
    code_language = models.CharField(max_length=100)
    submission_code = models.TextField()
    SUBMISSION_TYPES = (
        ('run', 'Run'),
        ('submit', 'Submit'),
    )
    submission_type = models.CharField(max_length=10, choices=SUBMISSION_TYPES)
    input_data = models.TextField()
    message = models.TextField()
    RESULTS = (
        ('Accepted', 'Accepted'),
        ('Wrong Answer', 'Wrong Answer'),
        ('Time Limit Exceeded', 'Time Limit Exceeded'),
        ('Runtime Error', 'Runtime Error'),
        ('Memory Limit Exceeded', 'Memory Limit Exceeded'),
    )
    result = models.CharField(max_length=50, choices=RESULTS)
    execution_time_ms = models.DecimalField(max_digits=10, decimal_places=2)
    memory_usage_in_mb = models.DecimalField(max_digits=10, decimal_places=2)
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    # class Meta:
    #     ordering = ['-created_at']  # Order posts by creation date