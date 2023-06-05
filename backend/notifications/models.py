from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from accounts.models import Account
from helpers.models import UpdateMixin


class Notification(UpdateMixin):
    class Meta:
        ordering = ("-id",)

    NotificationType = (
        ('WL', 'WELCOME'),
        ('AL', 'ALERT'),
    
    )
    
    account = models.ForeignKey("accounts.Account", on_delete=models.CASCADE)
    seen = models.BooleanField(default=False)
    notification_type = models.CharField(max_length=2, choices=NotificationType, default=NotificationType[0])
    message = models.TextField(default=None, null=True)


    @classmethod
    def generate_mass_notification(cls, accounts=Account.objects.none(), **kwargs):
        to_notify = accounts or Account.objects.all()
        for account in to_notify:
            Notification.objects.create(account=account, **kwargs)
