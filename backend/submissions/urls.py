
from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [
    path('submit/<int:pid>', views.makeSubmission),
    path('all_submissions/<int:pid>', views.getAllSubmissions),
    path('user_submissions/<str:pid>/user/<str:uid>', views.getUserSubmissions),
    path('<str:sub_id>', views.getSubmission),
    path('<str:sub_id>/check', views.checkSubmissionStatus),
]
