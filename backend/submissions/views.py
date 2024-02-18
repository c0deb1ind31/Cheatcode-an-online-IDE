from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .tasks  import run_submission

# Create your views here.
@api_view(['GET'])
def getAllSubmissions(request,pid):
    run_submission.delay()
    return Response("gets all submissions")

@api_view(['GET'])
def getUserSubmissions(request,pid):
    return Response("Gets all user submissions")


@api_view(['GET'])
def getSubmission(request,sub_id):
    return Response("gets submissions  from id")

@api_view(['GET'])
def checkSubmissionStatus(request,pid,sub_id):
    return Response("check submissions status")
