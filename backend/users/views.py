# backend/users/views.py

from rest_framework import generics, permissions
from.models import User, Follow
from.serializers import UserCreateSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class UserCreateView(generics.CreateAPIView):
    # 新規ユーザーを作成するだけのAPI

    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]

class FollowAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, username):
        follower = request.user
        try:
            following = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        if follower == following:
            return Response({"error": "You cannot follow yourself"}, status=status.HTTP_400_BAD_REQUEST)

        follow_relation, created = Follow.objects.get_or_create(follower=follower, following=following)

        if created:
            return Response({"message": "Followed"}, status=status.HTTP_201_CREATED)
        return Response({"message": "Already following"}, status=status.HTTP_200_OK)

    def delete(self, request, username):
        follower = request.user
        try:
            follow_relation = Follow.objects.get(follower=follower, following__username=username)
            follow_relation.delete()
            return Response({"message": "Unfollowed"}, status=status.HTTP_200_OK)
        except Follow.DoesNotExist:
            return Response({"error": "You are not following this user"}, status=status.HTTP_400_BAD_REQUEST)
    
class FollowersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"Error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        followers = user.followers.all()
        follower_list = [{"id": f.follower.id, "username": f.follower.username} for f in followers]

        return Response(follower_list, status=status.HTTP_200_OK)
    
class FollowingListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"Error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        following = user.following.all()
        following_list = [{"id": f.following.id, "username": f.following.username} for f in following]

        return Response(following_list, status=status.HTTP_200_OK)