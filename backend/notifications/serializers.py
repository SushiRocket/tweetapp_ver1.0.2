# backend/notifications/serializers.py

from rest_framework import serializers
from.models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source="sender.username")
    recipient_username = serializers.ReadOnlyField(source="recipient.username")

    class Meta:
        model = Notification
        fields = ["id", "sender_username", "recipient_username", "message", "is_read", "created_at"]
        read_only_fields = ["id", "sender_username", "recipient_username", "created_at"]    