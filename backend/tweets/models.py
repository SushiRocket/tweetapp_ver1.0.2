# backend/tweets/models.py

from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tweets")
    content = models.CharField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.content[:30]}"

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookmarks")
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE, related_name="bookmarked_by")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "tweet")

    def __str__(self):
        return f"{self.user.username} bookmarked {self.tweet.id}"