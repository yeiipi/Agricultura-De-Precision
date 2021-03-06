# Generated by Django 3.1.3 on 2020-11-05 06:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('greentower', '0003_auto_20201105_0503'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cultivo',
            name='fecha_activacion',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='medida',
            name='datetime',
            field=models.DateTimeField(default=datetime.datetime(2020, 11, 5, 6, 1, 23, 20835), verbose_name='Date'),
        ),
        migrations.AlterField(
            model_name='medida',
            name='tipo_magnitud',
            field=models.CharField(choices=[('temperatura', 'Temperatura'), ('ph', 'Ph'), ('luz', 'Luz')], max_length=50),
        ),
    ]
