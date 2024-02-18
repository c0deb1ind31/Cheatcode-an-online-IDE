from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET'])
def getAllProblems(request):
    return Response("All problems")


@api_view(['GET'])
def getProblem(request,pid):
    return Response("get particular problem")


@api_view(['POST'])
def submitSolution(request,pid):
    return Response("submits a solution")

