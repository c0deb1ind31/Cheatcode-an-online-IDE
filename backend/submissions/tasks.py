# tasks.py
from .models import Submissions
from problems.models import Problems

from celery import shared_task
import subprocess


@shared_task
def run_submission(submission_id, code, inputs, code_lang):
    submission=Submissions.objects.get(id=submission_id)
    problem=Problems.objects.get(id=submission_id.problem_id)
    print(problem)
    try:
        if code_lang == 'python':
            op = subprocess.run(["python", "-c", code],capture_output=True, text=True, check=True)
           
            submission.output=op.stdout
            if(problem.test_output==op.stdout.strip().strip("\n")):
                submission.result="Accepted"
            else:
                submission.result="Rejected"

        elif code_lang == 'javascript':
            op = subprocess.run(["node", "-e", code])
            submission.output=""
            submission.result="Accepted"

        else:
            print(f"Language '{code_lang}' is not supported.")

    except subprocess.CalledProcessError as e:
        submission.result="Runtime Error"
        submission.output= e.stderr


    submission.status="completed"
    submission.save()

    pass
