# tasks.py
from .models import Submissions
from problems.models import Problems

from celery import shared_task
import subprocess
import time


@shared_task
def run_submission(submission_id, code, inputs, code_lang):
    start_time = time.time()

    submission = Submissions.objects.get(id=submission_id)
    problem = Problems.objects.get(id=submission.problem_id)
    try:
        if code_lang == 'python':
            updated_code = "{}\nprint(solution.code({}))".format(code,problem.test_input)
            op = subprocess.run(["python", "-c", updated_code],
                                capture_output=True, text=True, check=True)

            submission.output = op.stdout
            if (problem.test_output.lower() == op.stdout.lower().strip().strip("\n")):
                submission.result = "Accepted"
            else:
                submission.result = "Rejected"

        elif code_lang == 'javascript':
            updated_code = "{}\nconsole.log(solution({}));".format(code,problem.test_input)

            op = subprocess.run(
                ["node", "-e", updated_code], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
            
            if op.stdout:
                submission.output = op.stdout 
            else:
                submission.output = op.stderr 

            if (problem.test_output.lower() == op.stdout.lower().strip().strip("\n")):
                submission.result = "Accepted"
            else:
                submission.result = "Rejected"
        else:
            print(f"Language '{code_lang}' is not supported.")

    except subprocess.CalledProcessError as e:
        submission.result = "Runtime Error"
        submission.output = e.stderr

    end_time = time.time()
    submission.execution_time_ms = (end_time - start_time)*1000

    submission.status = "completed"
    submission.save()

    pass
