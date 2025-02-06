# backend/likes/serializers.py

from rest_framework import serializers
from.models import Like

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ["id", "user", "tweet", "created_at"]
        read_only_fields = ["id", "tweet", "created_at"]