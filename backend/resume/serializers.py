from rest_framework import serializers
from .models import * 


class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfileImage
        fields = ['id','image', 'username', 'userProfile']