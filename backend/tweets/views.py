# backend/tweets/views.py

from rest_framework import viewsets, permissions
from.models import Tweet
from.serializers import TweetSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

# Create your views here.
class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all().order_by("-created_at")
    serializer_class = TweetSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self,serializer):
        # 新規作成時に "user" を自動的にセット
        tweet = serializer.save(user=self.request.user)

        # 新しいツイートが投稿されたらWebsocketで通知
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "tweets",
            {
                "type": "tweet_message",
                "tweet": {
                    "id": tweet.id,
                    "content": tweet.content,
                    "username": tweet.user.username,
                    "created_at": str(tweet.created_at),
                }
            }
        )