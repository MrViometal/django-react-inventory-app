from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 


# Create your models here.


class Manufacturer(models.Model):
    manufacturerName = models.CharField(max_length=100)
    manufacturerCode = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'manufacturers'

    def __str__(self):
        return self.manufacturerName
        

class Supplier(models.Model):
    supplierName = models.CharField(max_length=100)
    supplierCode = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        managed = True
        db_table = 'suppliers'
    

    def __str__(self):
        return self.supplierName


class Product(models.Model):
    productName = models.CharField(max_length=100)
    productCode = models.CharField(max_length=6, unique=True)
    # no more than 99,999,999.99 for price
    productPrice = models.DecimalField(max_digits=10, decimal_places=2)
    # no more thant 9999 units
    quantity = models.IntegerField(validators=[MaxValueValidator(10000), MinValueValidator(0)])
    description = models.CharField(max_length=600, blank=True)
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'products'

    def __str__(self):
        return self.productName

 