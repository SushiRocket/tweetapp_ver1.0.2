# backend/tweets/views.py

from rest_framework import viewsets, permissions
from.models import Tweet
from.serializers import TweetSerializer

# Create your views here.
class TweetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tweet.objects.all().order_by("-created_at")
    serializer_class = TweetSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self,serializer):
        # 新規作成時に "user" を自動的にセット
        serializer.save(user=self.request.user)