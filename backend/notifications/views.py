# backend/notifications/views.py

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer

class NotificationListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        # 未読だけを返す
        return Notification.objects.filter(recipient=self.request.user, is_read=False).order_by("-created_at")

class MarkAllAsReadView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        Notification.objects.filter(recipient=self.request.user, is_read=False).update(is_read=True)
        return Response({"detail": "All notifications marked as read"}, status=status.HTTP_200_OK)


class MarkOneAsReadView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NotificationSerializer  # 必要なら

    def patch(self, request, pk=None):
        # pk で特定の通知を既読にする
        notif = Notification.objects.filter(recipient=self.request.user, pk=pk).first()
        if not notif:
            return Response({"error": "Notification not found"}, status=status.HTTP_404_NOT_FOUND)

        notif.is_read = True
        notif.save()
        return Response({"detail": f"Notification {pk} marked as read"})