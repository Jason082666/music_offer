from django.db import models


class Question(models.Model):
    description = models.TextField()
    options = models.JSONField()  

    def __str__(self):
        return self.description
