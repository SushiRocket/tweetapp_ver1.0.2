# backend/comments/urls.py

from django.urls import path
from rest_framework.routers import DefaultRouter
from.views import CommentViewSet

router = DefaultRouter()
router.register(r"comments", CommentViewSet, basename="comments")

urlpatterns = router.urls