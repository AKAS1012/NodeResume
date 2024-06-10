from django.db import models
from django.contrib.auth.models import User, PermissionsMixin


class User(User,PermissionsMixin):
    def __str__(self):
        return "@{}".format(self.username)

def user_directory_path(instance, filename):
    return 'user_{0}/{1}'.format(instance, filename)

class UserProfileImage(models.Model):
    image = models.ImageField(blank=True, null=True, upload_to=user_directory_path)
    username = models.CharField(max_length=100, null=True)
    userProfile = models.CharField(max_length=100,null=True)

    def __str__(self):
        return str(self.image)
