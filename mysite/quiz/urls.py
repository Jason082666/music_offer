from django.urls import path
from .views import QuestionListView, CheckAnswerView

urlpatterns = [
    path('questions', QuestionListView.as_view(), name='question-list'),
    path('checkanswer', CheckAnswerView.as_view(), name='check-answer'),
]
