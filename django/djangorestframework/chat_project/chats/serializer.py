from rest_framework import serializers
from . import models
import users.serializer as users_serializer


class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Thread
        fields = '__all__'