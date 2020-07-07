from rest_framework import viewsets, permissions 
from stock.models import Product, Manufacturer , Supplier, Transaction
from .serializers import ProductSerializer, ManufacturerSerializer, SupplierSerializer, TransactionSerializer

# Product ViewSet

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProductSerializer

# Transaction ViewSet

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TransactionSerializer


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