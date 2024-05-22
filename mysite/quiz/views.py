from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class QuestionListView(APIView):
    def get(self, request, *args, **kwargs):
        questions = [
            {'description': '這是第一個問題', 'options': ['選項1', '選項2', '選項3']},
            {'description': '這是第二個問題', 'options': ['選項A', '選項B']},
            {'description': '這是第三個問題', 'options': ['選項甲', '選項乙', '選項丙']}
        ]
        return Response(questions, status=status.HTTP_200_OK)
