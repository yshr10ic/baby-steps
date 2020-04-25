from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
from chats.urls import router as chats_router
from rest_framework import routers

api_router = routers.DefaultRouter()
api_router.registry.extend(chats_router.registry)
urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^v1/', include(api_router.urls)),
]
