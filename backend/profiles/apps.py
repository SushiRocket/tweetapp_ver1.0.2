# backend/profiles/apps.py

from django.apps import AppConfig


class ProfilesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "profiles"

    def ready(self):
        import profiles.signals
        # この一行で signals.py が読み込まれ、デコレータ@receiverが有効になる
