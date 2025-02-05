# backend/likes/views.py

from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from tweets.models import Tweet
from.serializers import LikeSerializer
from.models import Like


class LikeToggleAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, tweet_id):

        try:
            tweet = Tweet.objects.get(id=tweet_id)
        except Tweet.DoesNotExist:
            return Response({"error": "Tweet not found."}, status=status.HTTP_404_NOT_FOUND)

        like, created = Like.objects.get_or_create(user=request.user, tweet=tweet)
        if created:
            serializer = LikeSerializer(like)
            return Response({
                "message": "Tweet liked successfully.",
                "likes_count": tweet.likes.count(),
                "like": serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": "Already liked."}, status=status.HTTP_200_OK)
        
    def delete(self, request, tweet_id):

        try:
            tweet = Tweet.objects.get(id=tweet_id)
            like = Like.objects.get(user=request.user, tweet=tweet)
            like.delete()
            return Response({
                "message":"Like removed.",
                "likes_count": tweet.likes.count(),
                }, status=status.HTTP_200_OK)
        except Tweet.DoesNotExist:
            return Response({"error": "Tweet not found."}, status=status.HTTP_404_NOT_FOUND)
        except Like.DoesNotExist:
            return Response({"error": "Like does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        