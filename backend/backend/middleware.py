# backend/backend/middleware.py

from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
from channels.auth import AuthMiddlewareStack

User = get_user_model()

class JWTAuthMiddleware:
    """
    WebSocketリクエストでJWT認証を行うカスタムミドルウェア
    """
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        # クエリ文字列から token を取得
        query_string = parse_qs(scope["query_string"].decode())
        token = query_string.get("token", [None])[0]

        if token:
            try:
                access_token = AccessToken(token)
                user = await database_sync_to_async(User.objects.get)(id=access_token["user_id"])
                scope["user"] = user
            except Exception as e:
                print(f"failed JWT: {e}")
                scope["user"] = AnonymousUser()
        else:
            scope["user"] = AnonymousUser()

        return await self.inner(scope, receive, send)

# Django Channels のミドルウェアとして適用
def JWTAuthMiddlewareStack(inner):
    return JWTAuthMiddleware(AuthMiddlewareStack(inner))
