# backend/comments/urls.py

from django.urls import path
from.views import TweetCommentViewSet,TweetCommentDetailView

urlpatterns = [
    path("tweets/<int:tweet_id>/comments/", TweetCommentViewSet.as_view(), name="tweet_comments_list_create"),
    path("tweets/<int:tweet_id>/comments/<int:comment_id>/", TweetCommentDetailView.as_view(), name="tweet_comment_detail"),
]