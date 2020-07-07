from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 


# Create your models here.



class Supplier(models.Model):
    supplier_name = models.CharField(max_length=100)
    supplier_code = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'suppliers'

    def __str__(self):
        return self.supplier_name
        
class Manufacturer(models.Model):
    manufacturer_name = models.CharField(max_length=100)
    manufacturer_code = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'manufacturers'

    def __str__(self):
        return self.manufacturer_name
        



class Product(models.Model):
    product_name = models.CharField(max_length=100)
    product_code = models.CharField(max_length=6, unique=True)
    # no more than 99,999,999.99 for price
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    # no more thant 9999 units
    product_quantity = models.IntegerField(validators=[MaxValueValidator(10000), MinValueValidator(0)])
    product_description = models.CharField(max_length=600, blank=True)
    product_supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    product_manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'products'

    def __str__(self):
        return self.product_name

class Transaction(models.Model):
    POSITIVE = 'POS'
    NEGATIVE = 'NEG'
    TYPES_OF_TRANSACTIONS = [
        (POSITIVE, 'Positive'),
        (NEGATIVE, 'Negative'),
    ]
    transaction_type = models.CharField(
        max_length=3,
        choices=TYPES_OF_TRANSACTIONS,
    )
    transaction_amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'transactions'


 