
from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [
    path('<int:uid>', views.getUser),
    path('create', views.createUser),

]
