# Generated by Django 3.0.8 on 2020-07-07 02:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0005_auto_20200707_0140'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='transaction_amount',
            field=models.IntegerField(),
        ),
    ]
