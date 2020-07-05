# Generated by Django 3.0.8 on 2020-07-05 13:51

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Manufacturer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturerName', models.CharField(max_length=100)),
                ('manufacturerCode', models.CharField(max_length=6, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('supplierName', models.CharField(max_length=100)),
                ('supplierCode', models.CharField(max_length=6, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('productName', models.CharField(max_length=100)),
                ('productCode', models.CharField(max_length=6, unique=True)),
                ('productPrice', models.DecimalField(decimal_places=2, max_digits=5)),
                ('quantity', models.IntegerField(validators=[django.core.validators.MaxValueValidator(10), django.core.validators.MinValueValidator(1)])),
                ('description', models.CharField(blank=True, max_length=600)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('manufacturerID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stock.Manufacturer')),
                ('supplierID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stock.Supplier')),
            ],
        ),
    ]