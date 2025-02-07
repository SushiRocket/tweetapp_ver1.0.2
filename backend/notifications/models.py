# backend/notifications/models.py

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Notification(models.Model):
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_notifications", null=True, blank=True)
    # 通知を発生させた人（likeやcommentした人など）
    # 「すべての通知が「誰(ユーザー)から」発生したとは限らない」という設計上の理由でnull,blankを設定

    message = models.CharField(max_length=255)

    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Notification to {self.recipient.username} from {self.sender.username} : {self.message[:20]}"