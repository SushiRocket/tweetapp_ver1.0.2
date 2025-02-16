# backend/users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model

class User(AbstractUser):
    
    # DjangoのAbstractUserを継承したカスタムUserモデル。
    # AbstractUserは username, email, first_name, last_name, password など
    # すでに多くのフィールドが定義されている。
    
    # 追加でプロフィール画像や自己紹介欄などを1つのモデルにまとめてもOK
    # 例:
    # profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)
    # bio = models.TextField(blank=True)

    # ここに追加フィールドを書ける
    pass

    def __str__(self):
        return self.username
    #のように書くと、このUserインスタンス（レコード）を文字列として扱う際には
    # "ユーザー名(self.username)" が返ってくるということになる。
    #もし__str__を定義しないと、User object (1)みたいな、ちょっと味気ない表記になる。
    #__str__を定義すると、管理画面やデバッグ時のprintなどに、
    # usernameが表示されるようになり、分かりやすいというメリットがある。

class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("follower", "following")

    def __str__(self):
        return f"{self.follower.username} follows {self.following.username}"