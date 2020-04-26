from rest_framework import viewsets, mixins
from . import models
from . import serializer
from chat_project import permission
from django.contrib.auth.mixins import UserPassesTestMixin
from rest_framework.exceptions import PermissionDenied, MethodNotAllowed


class ThreadPermission(UserPassesTestMixin):
    raise_exception = True

    def test_func(self):
        if not permission.owner_permission(self, models.Thread):
            return False
        if self.request.method == 'GET' and 'pk' in self.kwargs:
            raise MethodNotAllowed('Retrieve is not allowed')
        return True


class ThreadViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        if self.request.method == 'GET':
            return models.Thread.objects.all().filter(is_public=True)
        return models.Thread.objects.all()
    serializer_class = serializer.ThreadSerializer
