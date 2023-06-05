from helpers.viewsets import BaseAuthViewSet

from ..models import Notification, Account
from .serializers import NotificationSerializer
from helpers.utils import deserialize
from rest_framework.decorators import action
from helpers.viewsets import BaseViewSet, authenticated

from rest_framework.response import Response


class NotificationViewSet(BaseAuthViewSet):
    """
    Endpoints:\n
        GET            -   /notifications/
    """

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    
    @deserialize
    @authenticated
    def list(self, request):
        account = Account.objects.filter(id=request.user.id).first()
        return self.respond(queryset=self.queryset.filter(account= account))
    
    @deserialize
    @authenticated
    def retrieve(self, request, pk=None):
        account = Account.objects.filter(id=request.user.id).first()
        notification = Notification.objects.get(id=pk, account=account)
        serializer = NotificationSerializer(notification)

        return Response(serializer.data)
    
    @deserialize
    @authenticated
    def destroy(self, request, pk=None):
        account = Account.objects.filter(id=request.user.id).first()
        notification = Notification.objects.get(id=pk, account=account)
        notification.delete()
        serializer = NotificationSerializer(notification)
        return Response(serializer.data)

    @deserialize
    @authenticated
    def update(self, request, pk=None):
        account = Account.objects.filter(id=request.user.id).first()
        notification = Notification.objects.get(id=pk, account=account)
        notification.seen = True
        notification.save()
        serializer = NotificationSerializer(notification)
        return Response(serializer.data)

    @deserialize
    @authenticated
    def create(self, request, **kwargs):
        body = kwargs['data']
        account = Account.objects.filter(id=request.user.id).first()
        # TODO - validate data 
        notification = Notification(account=account, seen=body['seen'], message=body['message'], notification_type=body['notification_type'] )
        notification.save()
        serializer = NotificationSerializer(notification)
        return Response(serializer.data)
