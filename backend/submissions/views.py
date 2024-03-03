from django.shortcuts import render,get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.exceptions import ValidationError

from .models import Submissions
from users.models import Users
from .serializer import SubmissionsSerialiser

from .tasks import run_submission
# Create your views here.


@api_view(['GET'])
def getAllSubmissions(request, pid):
    submission = Submissions.objects.select_related("user").all().filter(
        problem_id=pid, submission_type="submit", status="completed").order_by("-submitted_at")
    serialiser = SubmissionsSerialiser(submission, many=True)
    return Response(data=serialiser.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def makeSubmission(request, pid):
    try:
        data = request.data
        
        user = get_object_or_404(Users, gid=data["user_id"])
        submission = Submissions(user_id=user.id, problem_id=pid, code_lang=data["lang"], submission_code=data["code"],
                                submission_type=data["submission_type"], status="pending")
        submission.save()

        print(submission)
        run_submission.delay(submission.id, submission.submission_code,
                            submission.inputs, submission.code_lang)
        data = {'submission_id': submission.id}

        return Response(data)
    except ValidationError:
        return Response("validation error")

@api_view(['GET'])
def getUserSubmissions(request, pid,uid):
    submission = Submissions.objects.filter(problem_id=pid, user__gid=uid).order_by("-submitted_at")
    serialiser = SubmissionsSerialiser(submission, many=True)
    return Response(data=serialiser.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getSubmission(request, sub_id):

    submission = get_object_or_404(Submissions,id=sub_id)
    serialiser = SubmissionsSerialiser(submission)
    return Response(data=serialiser.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def checkSubmissionStatus(request, sub_id):
    submission = get_object_or_404(Submissions,id=sub_id)
    serialiser = SubmissionsSerialiser(submission)
    if serialiser.data['status'] == "pending":
        data = {'status': 'pending'}
        return Response(data=data, status=status.HTTP_200_OK)

    return Response(data=serialiser.data, status=status.HTTP_200_OK)
