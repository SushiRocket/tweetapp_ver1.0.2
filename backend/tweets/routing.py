# backend/tweets/routing.py

from django.urls import re_path
from.consumer import TweetConsumer

websocket_urlpatterns = [
    re_path(r'ws/tweets/$', TweetConsumer.as_asgi()),
]