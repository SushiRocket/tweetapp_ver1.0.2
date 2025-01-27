# backend/tweets/urls.py

from rest_framework.routers import DefaultRouter
from.views import TweetViewSet

router = DefaultRouter
router.register(r'tweets', TweetViewSet, basename='tweets')

urlpatterns = router.urls