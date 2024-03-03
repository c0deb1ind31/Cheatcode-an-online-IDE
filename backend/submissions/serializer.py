from rest_framework import serializers
from .models import Submissions
from users.serializer import UsersSerializer
class SubmissionsSerialiser(serializers.ModelSerializer):
    user = UsersSerializer(read_only=True)

    class Meta:
        model = Submissions
        fields = '__all__'