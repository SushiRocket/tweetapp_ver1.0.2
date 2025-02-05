# backend/likes/serializers.py

from rest_framework import serializers
from.models import Like

class LikeSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()


    class Meta:
        model = Like
        fields = ["id", "user", "tweet", "created_at", "likes_count"]
        read_only_fields = ["id", "tweet", "created_at"]

    def get_likes_count(self, obj):
        return obj.tweet.likes.count()