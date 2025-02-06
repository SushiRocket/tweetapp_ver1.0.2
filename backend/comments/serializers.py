# backend/comments/serializers.py

from rest_framework import serializers
from .models import Comment
from tweets.models import Tweet

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "tweet", "user", "content", "created_at"]
        read_only_fields = ["user", "tweet", "created_at"]
        