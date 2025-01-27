# backend/users/urls.py

from django.urls import path
from.views import UserCreateView

urlpatterns = [
    path('users/register/', UserCreateView.as_view(), name="user_register"),
]