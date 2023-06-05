from django.contrib import admin

# Register your models here.
from .models import Notification

admin.site.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display= ['account', 'seen', 'notification_type']



