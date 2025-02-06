# backend/comments/views.py

from rest_framework import generics, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from.models import Comment
from tweets.models import Tweet
from.serializers import CommentSerializer

class TweetCommentViewSet(generics.ListCreateAPIView):

    # /api/tweets/<tweet_id>/comments/ に完全一致
    # GET: 特定ツイートのコメント一覧
    # POST: 特定ツイートにコメント追加
    
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    #   URLパラメータの tweet_id をもとにフィルタリング
    def get_queryset(self):
        
        tweet_id = self.kwargs["tweet_id"]
        return Comment.objects.filter(tweet_id=tweet_id).order_by("-created_at")

    def perform_create(self, serializer):
        
        # POST時にTweetを自動で紐付け、ユーザーも自動セット
        
        tweet_id = self.kwargs["tweet_id"]
        tweet = get_object_or_404(Tweet, id=tweet_id)
        serializer.save(user=self.request.user, tweet=tweet)

class TweetCommentDetailView(generics.RetrieveUpdateDestroyAPIView):

        # GET    /api/tweets/<tweet_id>/comments/<comment_id>/  → 単一コメント詳細
        # PATCH  /api/tweets/<tweet_id>/comments/<comment_id>/  → コメント編集
        # DELETE /api/tweets/<tweet_id>/comments/<comment_id>/  → コメント削除

    def get_queryset(self):
             
        tweet_id = self.kwargs["tweet_id"]
        return Comment.objects.filter(tweet_id=tweet_id)
    
    def get_object(self):
        queryset = self.get_queryset()
        comment_id = self.kwargs["comment_id"]
        return get_object_or_404(queryset, id=comment_id)
    
    def perform_update(self, serializer):
        serializer.save()
