from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AccountViewSet


router = DefaultRouter()
router.register(r'accounts', AccountViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('accounts/errors/<str:file_name>/', AccountViewSet.as_view({'get': 'serve_error_file'})),

]