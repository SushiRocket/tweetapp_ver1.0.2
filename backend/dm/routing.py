# backend/dm/routing.py

from django.urls import path
from .consumers import DMConsumer

websocket_urlpatterns = [
    path("ws/dm/<str:username>/", DMConsumer.as_asgi()),
]