from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from.models import User
#.は同じ階層のという意味

# Register your models here.

@admin.register(User)
class CustomUserAdmin(UserAdmin):

    # カスタムUserモデルを管理画面で扱うためのAdmin設定
    # Django標準のUserAdminを継承すると、基本的なUIが確保される。

    pass