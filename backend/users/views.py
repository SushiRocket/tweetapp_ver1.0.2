# backend/users/views.py

from rest_framework import generics, permissions
from.models import User
from.serializers import UserCreateSerializer

# Create your views here.

class UserCreateView(generics.CreateAPIView):
    # 新規ユーザーを作成するだけのAPI

    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]