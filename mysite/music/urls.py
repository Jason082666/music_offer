from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('quiz', views.quiz, name='quiz'),
    path('result', views.result, name='result'),
    path('album', views.album, name='album'),
]