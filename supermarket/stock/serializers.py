from rest_framework import serializers
from stock.models import Product, Manufacturer, Supplier, Transaction



# Manufacturer Serializer


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ('__all__')


# Supplier Serializer


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ('__all__')


# Product Serializer


class ProductSerializer(serializers.ModelSerializer):
    manufacturer_name = serializers.SerializerMethodField('get_manufacturer_name')
    supplier_name = serializers.SerializerMethodField('get_supplier_name')

    class Meta:
        model = Product
        fields = ['id', 'product_name', 'product_code', 'product_quantity','product_price', 'product_description','product_manufacturer', 'product_supplier', 'manufacturer_name', 'supplier_name']

    def get_manufacturer_name(self, obj):
        return obj.product_manufacturer.manufacturer_name

    def get_supplier_name(self, obj):
        return obj.product_supplier.supplier_name

# Product Serializer


class TransactionSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField('get_product_name')

    class Meta:
        model = Transaction
        fields = ['id', 'transaction_amount', 'transaction_product', 'transaction_type', 'product_name']

  

    def get_product_name(self, obj):
        return obj.transaction_product.product_name
