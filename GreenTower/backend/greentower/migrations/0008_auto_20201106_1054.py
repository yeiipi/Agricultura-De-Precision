# Generated by Django 3.1.3 on 2020-11-06 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('greentower', '0007_auto_20201105_1045'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='cultivo',
            options={'ordering': ('id',)},
        ),
        migrations.AddField(
            model_name='planta',
            name='humedad_max',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='planta',
            name='humedad_min',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='medida',
            name='tipo_magnitud',
            field=models.CharField(choices=[('1', 'Temperatura'), ('2', 'Humedad'), ('3', 'Ph'), ('4', 'Luz')], max_length=50),
        ),
        migrations.AlterField(
            model_name='planta',
            name='luz_max',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='planta',
            name='luz_min',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='planta',
            name='ph_max',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='planta',
            name='ph_min',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='planta',
            name='temp_max',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='planta',
            name='temp_min',
            field=models.FloatField(default=0),
        ),
    ]
