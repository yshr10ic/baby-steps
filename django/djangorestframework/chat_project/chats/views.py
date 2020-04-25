from rest_framework import viewsets, mixins
from . import models
from . import serializer


class ThreadViewSet(viewsets.ModelViewSet):
    queryset = models.Thread.objects.all()
    serializer_class = serializer.ThreadSerializer
