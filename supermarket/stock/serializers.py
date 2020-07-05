from rest_framework import serializers
from stock.models import Product, Manufacturer, Supplier

# Product Serializer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model: Product
        fields: '__all__'


# Product Serializer


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model: Manufacturer
        fields: '__all__'


# Product Serializer


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model: Supplier
        fields: '__all__'