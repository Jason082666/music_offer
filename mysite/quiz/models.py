from django.db import models

# Create your models here.


class Question(models.Model):
    description = models.TextField()
    options = models.JSONField()  # 儲存選項的 JSON 數據

    def __str__(self):
        return self.description
