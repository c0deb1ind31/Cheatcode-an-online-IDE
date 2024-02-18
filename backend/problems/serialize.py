from rest_framework import serializers
from .models import Problems

class ProblemsSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'