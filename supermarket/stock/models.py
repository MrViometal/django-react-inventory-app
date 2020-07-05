from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 


# Create your models here.


class Manufacturer(models.Model):
    manufacturerName = models.CharField(max_length=100)
    manufacturerCode = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Supplier(models.Model):
    supplierName = models.CharField(max_length=100)
    supplierCode = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Product(models.Model):
    productName = models.CharField(max_length=100)
    productCode = models.CharField(max_length=6, unique=True)
    productPrice = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.IntegerField(validators=[MaxValueValidator(10), MinValueValidator(1)])
    description = models.CharField(max_length=600, blank=True)
    manufacturerID = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    supplierID = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return str(self.item)+":$"+str(self.price)