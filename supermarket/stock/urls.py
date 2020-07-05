from rest_framework import routers
from .api import ProductViewSet, ManufacturerViewSet, SupplierViewSet

router = routers.DefaultRouter()
router.register('api/products', ProductViewSet, 'products')
router.register('api/manufacturers', ManufacturerViewSet, 'manufacturers')
router.register('api/suppliers', SupplierViewSet, 'suppliers')

urlpatterns = router.urls