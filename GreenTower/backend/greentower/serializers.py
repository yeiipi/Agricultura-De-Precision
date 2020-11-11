from rest_framework import serializers
from .models import *

class MedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medida
        fields = ('tipo_magnitud', 'magnitud', 'datetime',)



class PlantaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planta
        fields = (
            'temp_min','temp_max',
            'humedad_min', 'humedad_max',
            'ph_min', 'ph_max',
            'luz_min', 'luz_max',
        )
