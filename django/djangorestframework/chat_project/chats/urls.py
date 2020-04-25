from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'threads', views.ThreadViewSet)
