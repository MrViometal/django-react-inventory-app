# Generated by Django 3.0.8 on 2020-07-06 19:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0002_auto_20200706_1932'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='manufacturer',
            new_name='product_manufacturer',
        ),
    ]
