# backend/users/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model
from.models import Follow

User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]

    def create(self, validated_data):
        # create_user() でパスワードをハッシュ化して登録できる
        user = User.objects.create_user(
            username = validated_data["username"],
            email = validated_data.get("email", "") ,#emailは任意。メソッド呼び出し
            password = validated_data["password"],
        )
        return user
    
class UserProfileSerializer(serializers.ModelSerializer):
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "is_following"]

    def get_is_following(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return Follow.objects.filter(follower=request.user, following=obj).exists()
        return False