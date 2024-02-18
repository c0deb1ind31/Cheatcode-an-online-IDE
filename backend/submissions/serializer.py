from rest_framework import serializers
from .models import Submissions

class SubmissionsSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Submissions
        fields = '__all__'