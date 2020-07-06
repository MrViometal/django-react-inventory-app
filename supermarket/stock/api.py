from stock.models import Product, Manufacturer , Supplier
from rest_framework import viewsets, permissions 
from .serializers import ProductSerializer, ManufacturerSerializer, SupplierSerializer

# Product ViewSet

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProductSerializer


# Manufacturer ViewSet

class ManufacturerViewSet(viewsets.ModelViewSet):
    queryset = Manufacturer.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ManufacturerSerializer

# Supplier ViewSet

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SupplierSerializer