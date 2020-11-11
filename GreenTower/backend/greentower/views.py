from django.shortcuts import render
from rest_framework import generics
from .models import Medida, Planta
from .serializers import MedidaSerializer, PlantaSerializer


class ListMedida(generics.ListAPIView):
    queryset = Medida.objects.all()
    serializer_class = MedidaSerializer


class DetailMedida(generics.RetrieveAPIView):
    queryset = Medida.objects.raw("""SELECT * FROM greentower_medida WHERE greentower_medida.tipo_magnitud = '1' ORDER BY greentower_medida.datetime DESC LIMIT 30""")
    serializer_class = MedidaSerializer


class ListTemp(generics.ListAPIView):
    queryset = Medida.objects.raw("""SELECT * FROM greentower_medida WHERE greentower_medida.tipo_magnitud = '1' ORDER BY greentower_medida.datetime DESC LIMIT 30""")
    serializer_class = MedidaSerializer


class ListHum(generics.ListAPIView):
    queryset = Medida.objects.raw("""SELECT * FROM greentower_medida WHERE greentower_medida.tipo_magnitud = '2' ORDER BY greentower_medida.datetime DESC LIMIT 30""")
    serializer_class = MedidaSerializer


class ListPh(generics.ListAPIView):
    queryset = Medida.objects.raw("""SELECT * FROM greentower_medida WHERE greentower_medida.tipo_magnitud = '3' ORDER BY greentower_medida.datetime DESC LIMIT 30""")
    serializer_class = MedidaSerializer


class ListLuz(generics.ListAPIView):
    queryset = Medida.objects.raw("""SELECT * FROM greentower_medida WHERE greentower_medida.tipo_magnitud = '4' ORDER BY greentower_medida.datetime DESC LIMIT 30""")
    serializer_class = MedidaSerializer


class DetailedPlanta(generics.RetrieveAPIView):
    queryset = Planta.objects.all()
    serializer_class = PlantaSerializer


class ListPlantas(generics.ListAPIView):
    queryset = Planta.objects.all()
    serializer_class = PlantaSerializer
