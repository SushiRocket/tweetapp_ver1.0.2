# backend/profiles/views.py

from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from.serializers import ProfileSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

User = get_user_model()

class MyProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile

class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_class = [permissions.IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
         # URL から username を取得
        username = self.kwargs["username"]

        # その username を持つ User を取得
        user = get_object_or_404(User, username=username)

        # そのユーザーの Profile を返す
        return user.profile