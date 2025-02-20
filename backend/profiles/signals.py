# backend/profile/signals.py

import os
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.conf import settings
from django.contrib.auth import get_user_model
from.models import Profile

User = get_user_model()

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    # ユーザー作成時に自動でProfileを作る

    if created:
        Profile.objects.create(user=instance)
        print(f"Profile created for user: {instance.username}")

@receiver(post_save, sender=User)
def save_profile(sender,instance, **kwargs):
    # ユーザー更新時にもProfileをsaveする(念のため)
    
    if hasattr(instance, 'profile'):
        instance.profile.save()

@receiver(pre_save, sender=Profile)
def delete_old_profile_image(sender, instance, **kwargs):
    # Profileが更新される前に、古い画像ファイルを削除する

    if not instance.pk:
        # 新規作成の場合は古いファイルはまだない
        return
    
    try:
        old_profile = Profile.objects.get(pk=instance.pk)
    except Profile.DoesNotExist:
        return
    
    old_image = old_profile.profile_image
    new_image = instance.profile_image

    # もし古いファイルが存在して、かつ新しいファイルと違い、
    # なおかつ old_image がデフォルト画像でなければ削除する

    if old_image and old_image != new_image:
        old_path = os.path.join(settings.MEDIA_ROOT, old_image.name)
        if os.path.exists(old_path):
            os.remove(old_path)
            print(f"Delete old profile image: {old_path}")