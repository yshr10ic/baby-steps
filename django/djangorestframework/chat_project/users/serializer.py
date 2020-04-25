from rest_framework import serializers
from . import models


class UserMinSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'username', ]