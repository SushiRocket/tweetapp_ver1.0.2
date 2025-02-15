# backend/tweets/urls.py

from rest_framework.routers import DefaultRouter
from.views import TweetViewSet, bookmark_tweet, list_bookmarks
from django.urls import path

router = DefaultRouter()
router.register(r'tweets', TweetViewSet, basename='tweets')

urlpatterns = router.urls

urlpatterns += [
    path("tweets/<int:tweet_id>/bookmark/", bookmark_tweet, name="bookmark_tweet"),
    path("bookmarks/", list_bookmarks, name="list_bookmarks"),
]
