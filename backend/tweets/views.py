# backend/tweets/views.py

from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from.models import Tweet, Bookmark
from.serializers import TweetSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class BookmarkAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, tweet_id):
        user = request.user
        try:
            tweet = Tweet.objects.get(id=tweet_id)
        except Tweet.DoesNotExist:
            return Response({"Error": "Tweet not Found."}, status=status.HTTP_404_NOT_FOUND)
        
        bookmark, created = Bookmark.objects.get_or_create(user=user, tweet=tweet)

        if not created:
            bookmark.delete()
            return Response({"Message": "Bookmark removed."}, status=status.HTTP_200_OK)
        return Response({"Message": "Tweet bookmarked."}, status=status.HTTP_201_CREATED)
    
    def get(self, request):
        user = request.user
        bookmarks = Bookmark.objects.filter(user=user).select_related("tweet")
        bookmarked_tweets = [
            {
                "id": b.tweet.id,
                "content": b.tweet.content,
                "created_at": b.tweet.created_at
            }
            for b in bookmarks
        ]
        return Response(bookmarked_tweets, status=status.HTTP_200_OK)
    
    def delete(self, request, tweet_id):
        user = request.user
        try:
            bookmark = Bookmark.objects.get(user=user, tweet_id=tweet_id)
            bookmark.delete()
            return Response({"Message": "Bookmark removed."}, status=status.HTTP_200_OK)
        except Bookmark.DoesNotExist:
            return Response({"Error": "Bookmark not found."}, status=status.HTTP_404_NOT_FOUND)

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