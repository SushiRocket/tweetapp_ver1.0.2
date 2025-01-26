from rest_framework import serializers
from.models import User

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]

        def create(self, validated_data):
            # create_user() でパスワードをハッシュ化して登録できる
            user = User.objects.create_user(
                username = validated_data["username"],
                email = validated_data.get("email", "") ,#emailは任意。メソッド呼び出し
                password = validated_data["passwoed"],
            )
            return user