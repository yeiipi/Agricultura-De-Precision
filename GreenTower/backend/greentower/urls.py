from django.urls import path
from .views import *

urlpatterns = [
    path('medida/', ListMedida.as_view()),
    path('medida/temperatura/', ListTemp.as_view()),
    path('medida/humedad/', ListHum.as_view()),
    path('medida/ph/', ListPh.as_view()),
    path('medida/luz/', ListLuz.as_view()),
    path('planta/', ListPlantas.as_view()),
    path('planta/<int:pk>/', DetailedPlanta.as_view()),
]