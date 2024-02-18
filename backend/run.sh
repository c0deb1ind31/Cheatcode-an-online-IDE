#!/bin/bash
python manage.py makemigrations
python manage.py migrate
gunicorn backend.wsgi:application --log-file - -b 0.0.0.0:5000 --reload --timeout 600 