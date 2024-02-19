from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.http import JsonResponse

from .models import Problems
from submissions.models import Submissions
from .serializer import ProblemsSerialiser
# Create your views here.


@api_view(['GET'])
def getAllProblems(request):
    problems = Problems.objects.all()
    serialiser = ProblemsSerialiser(problems, many=True)
    return Response(serialiser.data)


@api_view(['GET'])
def getProblem(request, pid):
    problems = Problems.objects.get(id=pid)
    serialiser = ProblemsSerialiser(problems)
    return JsonResponse(data=serialiser.data,status=status.HTTP_200_OK)


