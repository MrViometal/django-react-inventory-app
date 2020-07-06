from rest_framework import serializers
from stock.models import Product, Manufacturer, Supplier



# Manufacturer Serializer


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ('manufacturerName', 'manufacturerCode')


# Supplier Serializer


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ('supplierName', 'supplierCode')


# Product Serializer


class ProductSerializer(serializers.ModelSerializer):
    manufacturer = ManufacturerSerializer(read_only=True)
    supplier = SupplierSerializer(read_only=True)
    class Meta:
        model = Product
        fields = ('id', 'productName', 'productCode', 'quantity','productPrice', 'description', 'manufacturer', 'supplier')



