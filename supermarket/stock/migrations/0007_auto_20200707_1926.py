# Generated by Django 3.0.8 on 2020-07-07 19:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0006_auto_20200707_0235'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='transaction_product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stock.Product'),
        ),
    ]
