from django.shortcuts import render
from datetime import datetime
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from .models import Task
import json

@csrf_exempt
def task_list(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        data = [{'id': task.id, 'title': task.title, 'done': task.done, 'author_ip': task.author_ip,
                 'created_date': task.created_date.strftime("%Y-%m-%d %H:%M:%S"),
                 'done_date': task.done_date.strftime("%Y-%m-%d %H:%M:%S") if task.done_date else None}
                for task in tasks]
        return JsonResponse(data, safe=False)
    
    elif request.method == 'POST':
        data = json.loads(request.body)
        title = data.get('title')
        done = data.get('done', False)
        done_date = data.get('done_date')
        author_ip = request.META.get('REMOTE_ADDR')

        if done and done_date is not None:
            Task.objects.create(title=title, done=done, done_date=done_date, author_ip=author_ip)
        elif done:
            Task.objects.create(title=title, done=done, author_ip=author_ip, done_date=datetime.now())
        else:
            Task.objects.create(title=title, done=done, author_ip=author_ip)

        return JsonResponse({'message': 'Task created successfully'}, status=201)

@csrf_exempt
def task_detail(request, task_id):
    task = get_object_or_404(Task, pk=task_id)

    if request.method == 'GET':
        data = {'id': task.id, 'title': task.title, 'done': task.done, 'author_ip': task.author_ip,
                'created_date': task.created_date.strftime("%Y-%m-%d %H:%M:%S"),
                'done_date': task.done_date.strftime("%Y-%m-%d %H:%M:%S") if task.done_date else None}
        return JsonResponse(data)

    elif request.method == 'DELETE':
        task.delete()
        return JsonResponse({'message': 'Task deleted successfully'}, status=204)