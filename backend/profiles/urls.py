# backend/profiles/urls.py

from django.urls import path
from.views import MyProfileView, UserProfileView

urlpatterns = [
    path("profile/me/", MyProfileView.as_view(), name="my_profile"),
    path("users/<str:username>/profile/", UserProfileView.as_view(), name="user_profile"),
]