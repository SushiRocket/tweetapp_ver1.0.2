# backend/tweets/serializers.py

from rest_framework import serializers
from.models import Tweet

class TweetSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Tweet
        fields = ["id", "username", "content", "created_at"]
        read_only_fields = ["id", "username", "created_at"]