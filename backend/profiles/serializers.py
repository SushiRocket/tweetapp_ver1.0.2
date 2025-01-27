# backend/profiles/serializers.py

from rest_framework import serializers
from.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id", "profile_image", "bio"]
        read_only_fileds = ["id"]