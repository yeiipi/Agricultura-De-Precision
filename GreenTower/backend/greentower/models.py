from django.db import models
from django.utils import timezone


class Planta(models.Model):
    nombre = models.CharField(max_length=30)
    temp_min = models.FloatField(default=0)
    temp_max = models.FloatField(default=0)
    humedad_min = models.FloatField(default=0)
    humedad_max = models.FloatField(default=0)
    ph_min = models.FloatField(default=0)
    ph_max = models.FloatField(default=0)
    luz_min = models.FloatField(default=0)
    luz_max = models.FloatField(default=0)

    class Meta:
        ordering = ('nombre', )

    def __str__(self):
        return f'{self.nombre}'


class Cultivo(models.Model):
    id_planta = models.ForeignKey(Planta, on_delete=models.DO_NOTHING)
    fecha_activacion = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ('id', )

    def __str__(self):
        return f'{self.id}'


class Medida(models.Model):
    TM_POS = (
        ('1', 'Temperatura'),
        ('2', 'Humedad'),
        ('3', 'Ph'),
        ('4', 'Luz'),
    )
    datetime = models.DateTimeField(default=timezone.now)
    magnitud = models.FloatField(default=0)
    tipo_magnitud = models.CharField(max_length=50, choices=TM_POS)
    id_cultivo = models.ForeignKey(Cultivo, on_delete=models.CASCADE)

    class Meta:
        ordering = ('-datetime', )

    def __str__(self):
        return f'{self.tipo_magnitud}:{self.magnitud}'