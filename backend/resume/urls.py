from django.urls import path
from .views import UserProfileList


urlpatterns = [
    path('UserPro/', UserProfileList.as_view())

]
