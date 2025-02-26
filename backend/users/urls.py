# backend/users/urls.py

from django.urls import path
from.views import UserCreateView,FollowAPIView,FollowersListView,FollowingListView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name="user_register"),
    path("users/<str:username>/follow/", FollowAPIView.as_view(), name="follow_user"),
    path("users/<str:username>/unfollow/", FollowAPIView.as_view(), name="unfollow_user"),
    path("users/<str:username>followers/", FollowersListView.as_view(), name="list_followers"),
    path("users/<str:username>following/", FollowingListView.as_view(), name="list_following"),
]