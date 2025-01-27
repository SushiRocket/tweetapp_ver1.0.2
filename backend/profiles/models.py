# backend/profiles/models.py

from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model

# Create your models here.

def upload_profile_image_path(instance, filename):

    # プロフィール画像を user_<user_id>/profile.jpg の形で保存する
    # ファイル名は必ず 'profile.jpg' に固定

    return f"profile_images/user_{instance.user.id}/profile.jpg"

User = get_user_model()
# カスタムUser（users.User）を動的に取得

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    profile_image = models.ImageField(upload_to=upload_profile_image_path, default='default_profile.png')
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username
