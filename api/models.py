from django.db import models

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    done = models.BooleanField(default=False)
    author_ip = models.CharField(max_length=45)
    created_date = models.DateTimeField(auto_now_add=True)
    done_date = models.DateTimeField(blank=True, null=True)
