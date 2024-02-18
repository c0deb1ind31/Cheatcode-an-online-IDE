# tasks.py
from .models import Submissions

from celery import shared_task


@shared_task
def run_submission():

    print("celery Working")
    # Task implementation
    pass