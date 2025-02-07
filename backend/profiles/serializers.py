# backend/profiles/serializers.py

from rest_framework import serializers
from.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Profile
        fields = ["id", "profile_image", "bio", "username"]
        read_only_fileds = ["id"]