from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
from pathlib import Path

class QuestionListView(APIView):
    def get(self, request, *args, **kwargs):
        questions = [
           '我經常結交新朋友',
           '我是一個安靜、內斂的人',
           '在社交場合中，比起他人來介紹我，通常是我自己主動認識他人',
           '我是一個務實的人',
           '如果我是一個作曲家，我會更重視音樂的理論',
           '我喜歡有規劃地安排行程',
           '我是容易以情緒主導來思考',
           '我傾向以邏輯來行事',
           '我是一個重感情的人',
           '我喜歡規律與計畫',
           '如果我是演奏者，我更喜歡能即興演出',
           '如果我是一名音樂系學生，練琴時我會規劃精密的計畫'
        ]
        return Response(questions, status=status.HTTP_200_OK)



class CheckAnswerView(APIView):
    def post(self, request, *args, **kwargs):
        user_answers = request.data.get("answers", [])

        # 定義預定答案
        predefined_answers = [
            [1, 0, 1], [0, 1, 0], [1, 0, 1], [0, 1, 0],  # E/I
            [1, 0, 1], [0, 1, 0], [1, 0, 1], [0, 1, 0],  # N/S
            [1, 0, 1], [0, 1, 0], [1, 0, 1], [0, 1, 0]   # F/T
        ]

        # 定義得分初始值
        scores = {
            "E": 0,
            "I": 0,
            "N": 0,
            "S": 0,
            "F": 0,
            "T": 0,
            "P": 0,
            "J": 0
        }

        # 比較用戶答案與預定答案並計算得分
        for i in range(0, 12):
            if user_answers[i] == predefined_answers[i][0]:
                if i < 4:
                    scores["E"] += 1
                elif i < 8:
                    scores["N"] += 1
                elif i < 12:
                    scores["F"] += 1
            else:
                if i < 4:
                    scores["I"] += 1
                elif i < 8:
                    scores["S"] += 1
                elif i < 12:
                    scores["T"] += 1

        # 計算最後一組問題的 P/J 得分
        for i in range(12, 16):
            if user_answers[i - 12] == predefined_answers[i - 12][2]:
                scores["P"] += 1
            else:
                scores["J"] += 1

        # 組裝最終的 MBTI 結果
        result = ""
        result += "E" if scores["E"] > scores["I"] else "I"
        result += "N" if scores["N"] > scores["S"] else "S"
        result += "F" if scores["F"] > scores["T"] else "T"
        result += "P" if scores["P"] > scores["J"] else "J"

       
        emotion_code = user_answers[-1]  # 最後一個答案代表情緒
        emotion_map = {1: '快樂的', 2: '悲傷的', 3: '興奮的', 4: '憤怒的'}
        emotion = emotion_map.get(emotion_code, '')

        base_dir = Path(__file__).resolve().parent

        # 構建相對路徑
        file_path = base_dir / '..' / 'data.xlsx'
        df = pd.read_excel(file_path, sheet_name='工作表1')

        # 篩選出對應的曲目和專輯名稱
        filtered_df = df[(df['MBTI'] == 'INTJ') & (df['情緒'] == '悲傷的')]
        print(filtered_df)
        random_row = filtered_df.sample(n=1)

        result = random_row[['曲目（英）','曲目（中）','作曲家','MBTI','YT連結','作曲家簡介','專輯名稱','演奏家','購買平台','價錢','購買連結']].to_dict(orient='records')
        print(result)

        return Response({"result": result}, status=status.HTTP_200_OK)