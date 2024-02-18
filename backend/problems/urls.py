
from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.getAllProblems),
    path('<str:pid>', views.getProblem),
    path('<str:pid>/submit', views.submitSolution),
]
