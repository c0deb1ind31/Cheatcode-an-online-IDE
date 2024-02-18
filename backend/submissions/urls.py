
from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [

    path('all_submissions/<str:pid>', views.getAllSubmissions),
    path('user_submissions/<str:pid>', views.getUserSubmissions),
    path('<str:sub_id>', views.getSubmission),
    path('<str:sub_id>/check', views.checkSubmissionStatus),
]
