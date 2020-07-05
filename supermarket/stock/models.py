from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 


# Create your models here.


class Product(models.Model):
    productName = models.CharField(max_length=100)
    productPrice = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.IntegerField(validators=[MaxValueValidator(10), MinValueValidator(1)])
    manufacturerID = models.ForeignKey(manufacturer, on_delete=models.CASCADE)
    supplier = models.ForeignKey(manufacturer, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.item)+":$"+str(self.price)


class Manufacturer(models.Model):
    manufacturerName = models.CharField(max_length=100)

class Supplier(models.Model):
    supplierName = models.CharField(max_length=100)