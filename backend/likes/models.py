# backend/likes/models.py

from django.db import models
from django.conf import settings
from tweets.models import Tweet

User = settings.AUTH_USER_MODEL

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE, related_name="likes")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'tweet')  # 同じユーザーが同じツイートを複数回いいねできないように

    def __str__(self):
        return f"{self.user} likes Tweet {self.tweet.id}"
