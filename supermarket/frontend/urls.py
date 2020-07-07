from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('products/', views.index),
    path('manufacturers/', views.index),
    path('suppliers/', views.index),
    path('transactions/', views.index)
]
