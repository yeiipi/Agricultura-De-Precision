# Generated by Django 3.1.3 on 2020-11-13 02:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('greentower', '0008_auto_20201106_1054'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medida',
            name='magnitud',
            field=models.FloatField(default=0),
        ),
    ]
