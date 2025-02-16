# backend/users/urls.py

from django.urls import path
from.views import UserCreateView,FollowAPIView,FollowersListView,FollowingListView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name="user_register"),
    path("users/<int:user_id>/follow/", FollowAPIView.as_view(), name="follow_user"),
    path("users/<int:user_id>/unfollow/", FollowAPIView.as_view(), name="unfollow_user"),
    path("users/<int:user_id>/followers/", FollowersListView.as_view(), name="list_followers"),
    path("users/<int:user_id>/following/", FollowingListView.as_view(), name="list_following"),
]