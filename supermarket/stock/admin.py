from django.contrib import admin
from stock.models import Product, Manufacturer, Supplier


# Register your models here.
admin.site.register(Product)
admin.site.register(Manufacturer)
admin.site.register(Supplier)
