# tasks.py
from .models import Submissions
from problems.models import Problems

from celery import shared_task
import subprocess
import time

@shared_task
def run_submission(submission_id, code, inputs, code_lang):
    start_time = time.time()

    submission=Submissions.objects.get(id=submission_id)
    problem=Problems.objects.get(id=submission.problem_id)
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

    end_time = time.time()
    submission.execution_time_ms= (end_time - start_time)*1000

    submission.status="completed"
    submission.save()

    pass
