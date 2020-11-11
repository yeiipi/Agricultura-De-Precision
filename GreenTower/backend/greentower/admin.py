from django.contrib import admin
from .models import Planta, Cultivo, Medida


@admin.register(Planta)
class PlantaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'temp_min', 'temp_min', 'humedad_min', 'humedad_max', 'luz_min', 'luz_max', 'ph_min', 'ph_max', )
    search_fields = ('nombre', )


@admin.register(Cultivo)
class CultivoAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_planta', 'fecha_activacion')


@admin.register(Medida)
class MedidaAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_cultivo', 'tipo_magnitud', 'magnitud', 'datetime', )
    search_fields = ('tipo_magnitud', )
    list_filter = ('tipo_magnitud', )
