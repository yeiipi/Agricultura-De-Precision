# Generated by Django 3.1.3 on 2020-11-05 15:45

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('greentower', '0004_auto_20201105_0601'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medida',
            name='datetime',
            field=models.DateTimeField(default=datetime.datetime(2020, 11, 5, 15, 45, 19, 419033, tzinfo=utc)),
        ),
    ]