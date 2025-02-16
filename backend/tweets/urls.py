# backend/tweets/urls.py

from rest_framework.routers import DefaultRouter
from.views import TweetViewSet, BookmarkAPIView
from django.urls import path

router = DefaultRouter()
router.register(r'tweets', TweetViewSet, basename='tweets')

urlpatterns = router.urls

urlpatterns += [
    path("tweets/<int:tweet_id>/bookmark/", BookmarkAPIView.as_view(), name="bookmark_tweet"),
    path("bookmarks/", BookmarkAPIView.as_view(), name="list_bookmarks"),
    path("tweets/<int:tweet_id>/unbookmark/", BookmarkAPIView.as_view(), name="unbookmark_tweet"),
]
