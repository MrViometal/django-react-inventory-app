# Generated by Django 3.0.8 on 2020-07-07 01:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0004_transaction_transaction_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='transaction_type',
            field=models.CharField(choices=[('POS', 'Positive'), ('NEG', 'Negative')], max_length=3),
        ),
    ]
