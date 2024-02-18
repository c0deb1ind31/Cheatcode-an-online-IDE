from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Submissions
from .serializer import SubmissionsSerialiser

from .tasks import run_submission
# Create your views here.


@api_view(['GET'])
def getAllSubmissions(request, pid):
    submission = Submissions.objects.filter(problem_id=uid)
    serialiser = SubmissionsSerialiser(submission, many=True)
    return Response(data=serialiser.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def makeSubmission(request, pid):
    data = request.data
    submission = Submissions(user_id=data["user_id"], problem_id=pid, code_lang=data["lang"], submission_code=data["code"],
                             submission_type=data["submission_type"], inputs=data["inputs"], status="pending")
    submission.save()
    run_submission.delay(submission.id, submission.submission_code,
                         submission.inputs, submission.code_lang)
    data = {'submission_id': submission.id}

    return Response(data)


@api_view(['GET'])
def getUserSubmissions(request, uid):
    submission = Submissions.objects.filter(user_id=uid)
    serialiser = SubmissionsSerialiser(submission, many=True)
    return Response(data=serialiser.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getSubmission(request, sub_id):
    submission = Submissions.objects.get(id=sub_id)
    serialiser = SubmissionsSerialiser(submission)
    return Response(data=serialiser.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def checkSubmissionStatus(request, sub_id):
    submission = Submissions.objects.get(id=sub_id)
    serialiser = SubmissionsSerialiser(submission)
    if serialiser.data['status'] == "pending":
        data = {'status': 'pending'}
        return Response(data=data, status=status.HTTP_200_OK)

    return Response(data=serialiser.data, status=status.HTTP_200_OK)
