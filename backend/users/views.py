from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.exceptions import ValidationError
from django.db import IntegrityError

from .models import Users
from .serializer import UsersSerializer

# Create your views here.
@api_view(['GET'])
def getUser(request, uid):
    user = get_object_or_404(Users, gid=uid)
    serialiser = UsersSerializer(user)
    return Response(data=serialiser.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createUser(request):
    data = request.data
    try:
        newUser = Users(
            gid=data['gid'], username=data['username'], email=data['email'])
        newUser.save()
    except IntegrityError:
        return Response(data={"message": "User already exists"}, status=status.HTTP_409_CONFLICT)

    return Response(data={"message": "User created successfully"}, status=status.HTTP_200_OK)
