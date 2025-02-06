# backend/tweets/serializers.py

from rest_framework import serializers
from.models import Tweet

class TweetSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    user_has_liked = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = ["id", "username", "content", "created_at","user_has_liked", "likes_count"]
        read_only_fields = ["id", "username", "created_at"]

    def get_user_has_liked(self, obj):
        request = self.context.get("request", None)
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False

    def get_likes_count(self, obj):
        return obj.likes.count()