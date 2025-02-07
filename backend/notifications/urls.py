# backend/notifications/urls.py

from django.urls import path
from .views import NotificationListView, MarkAllAsReadView, MarkOneAsReadView

urlpatterns = [
    path("notifications/", NotificationListView.as_view(), name="notification_list"),
    path("notifications/mark_all/", MarkAllAsReadView.as_view(), name="mark_all_read"),
    path("notifications/<int:pk>/mark_read/", MarkOneAsReadView.as_view(), name="mark_one_read"),
]
