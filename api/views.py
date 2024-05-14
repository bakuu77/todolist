from datetime import datetime
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse
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
        json_data = json.dumps(data, indent=4)
        return HttpResponse(json_data, content_type='application/json')
    
    elif request.method == 'POST':
        if request.body:
            try:
                data = json.loads(request.body)
                title = data.get('title')
                done = data.get('done', False)
                done_date = data.get('done_date')
                author_ip = request.META.get('REMOTE_ADDR')
                if done and done_date is not None:
                    Task.objects.create(title=title, done=done, done_date=done_date, author_ip=author_ip)
                elif done:
                    Task.objects.create(title=title, done=done, author_ip=author_ip, done_date=datetime.now())
                elif not done and done_date is not None:
                    return HttpResponseBadRequest
                else:
                    Task.objects.create(title=title, done=done, author_ip=author_ip)

                return JsonResponse({'message': 'Task created successfully'}, status=201)
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Nieprawidłowe dane JSON'}, status=400)
        else:
            return JsonResponse({'error': 'Empty body of the request'}, status=400)
@csrf_exempt
def task_detail(request, task_id):
    task = get_object_or_404(Task, pk=task_id)

    if request.method == 'GET':
        data = {'id': task.id, 'title': task.title, 'done': task.done, 'author_ip': task.author_ip,
                'created_date': task.created_date.strftime("%Y-%m-%d %H:%M:%S"),
                'done_date': task.done_date.strftime("%Y-%m-%d %H:%M:%S") if task.done_date else None}
        json_data = json.dumps(data, indent=4)
        return HttpResponse(json_data, content_type='application/json')
    
    elif request.method == 'PUT':
        if request.body:
            try:
                data = json.loads(request.body)
                task.title = data.get('title', task.title)
                task.done = data.get('done', task.done)
                task.done_date = data.get('done_date', task.done_date)
                task.save()
                return JsonResponse({'message': 'Task created successfully'}, status=201)
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Wrong JSON data'}, status=400)
        else:
            return JsonResponse({'error': 'Empty body of the request'}, status=400)
    
    elif request.method == 'DELETE':
        task.delete()
        return HttpResponse({'message': 'Task deleted successfully'}, status=200)