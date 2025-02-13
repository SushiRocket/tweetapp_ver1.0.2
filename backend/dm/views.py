# backend/dm/views.py

from rest_framework import generics, permissions
from.models import DirectMessage
from.serializers import DirectMessageSerializer
from django.db.models import Q

class DirectMessageListView(generics.ListAPIView):
    serializer_class = DirectMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        other_user_id = self.request.query_params.get("user")
        if not other_user_id:
            return DirectMessage.objects.none()
        
        return DirectMessage.objects.filter(
            Q(sender_id=user.id, recipient_id=other_user_id) |
            Q(sender_id=other_user_id, recipient_id=user.id)
        ).order_by("created_at")