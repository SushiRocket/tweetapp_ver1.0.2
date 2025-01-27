# backend/profiles/views.py

from rest_framework import generics, permissions
from.models import Profile
from.serializers import ProfileSerializer

# Create your views here.

class MyProfileView(generics.RetrieveUpdateAPIView):
    permission_class = [permissions.IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        # ログイン中のユーザーの Profile を返す
        return self.request.user.profile
    