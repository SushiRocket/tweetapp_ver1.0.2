# backend/dm/views.py

from rest_framework import generics, permissions
from.models import DirectMessage
from.serializers import DirectMessageSerializer
from django.db.models import Q
from django.contrib.auth import get_user_model

User = get_user_model()

class DirectMessageListView(generics.ListAPIView):
    serializer_class = DirectMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        other_username = self.request.query_params.get("username")

        if not other_username:
            print("❌ Error: No username provided in query params.")
            return DirectMessage.objects.none()
        try:
            other_user = User.objects.get(username=other_username)
        except User.DoesNotExist:
            print("❌ Error: No username provided in query params.")
            return DirectMessage.objects.none()

        
        return DirectMessage.objects.filter(
            Q(sender=user, recipient=other_user) |
            Q(sender=other_user, recipient=user)
        ).order_by("created_at")