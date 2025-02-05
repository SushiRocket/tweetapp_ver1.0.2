# backend/likes/urls.py

from django.urls import path
from.views import LikeToggleAPIView

urlpatterns = [
    path("tweets/<int:tweet_id>/like/", LikeToggleAPIView.as_view(), name="tweet_like"),
    path("tweets/<int:tweet_id>/unlike/", LikeToggleAPIView.as_view(), name="tweet_unlike"),
]