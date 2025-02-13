# backend/dm/urls.py

from rest_framework.urls import path
from.views import DirectMessageListView

urlpatterns = [
    path("dm/", DirectMessageListView.as_view(), name="dm_list"),
]