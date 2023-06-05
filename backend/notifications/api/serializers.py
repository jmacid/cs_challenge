from rest_framework.serializers import SerializerMethodField

from helpers import serializers
from ..models import Notification


class NotificationSerializer(serializers.BaseSerializer):
    class Meta:
        model = Notification
        fields = (
            "id",
            "account",
            "created_at",
            "seen",
            "notification_type",
            "message",
        )

    def create(self, data):
        notification = Notification.objects.create(**data)
        return notification
