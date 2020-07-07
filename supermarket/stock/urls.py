from rest_framework import routers
from .api import ProductViewSet, ManufacturerViewSet, SupplierViewSet, TransactionViewSet

router = routers.DefaultRouter()
router.register('api/products', ProductViewSet, 'products')
router.register('api/transactions', TransactionViewSet, 'transactions')
router.register('api/manufacturers', ManufacturerViewSet, 'manufacturers')
router.register('api/suppliers', SupplierViewSet, 'suppliers')

urlpatterns = router.urls