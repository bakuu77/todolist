from django.test import Client, TestCase
from django.urls import reverse
from .models import Task
import json

class TaskTest(TestCase):
    def setUp(self):
        self.task1 = Task.objects.create(title='Task 1', author_ip='127.0.0.1')
        self.task2 = Task.objects.create(title='Task 2', author_ip='192.168.1.1', done=True)

    def test_task_creation(self):
        self.assertEqual(self.task1.title, 'Task 1')
        self.assertEqual(self.task1.done, False)
        self.assertEqual(self.task1.author_ip, '127.0.0.1')
        self.assertIsNotNone(self.task1.created_date)
        self.assertIsNone(self.task1.done_date)

        self.assertEqual(self.task2.title, 'Task 2')
        self.assertEqual(self.task2.done, True)
        self.assertEqual(self.task2.author_ip, '192.168.1.1')
        self.assertIsNotNone(self.task2.created_date)
        self.assertIsNone(self.task2.done_date)

    def test_str_representation(self):
        self.assertEqual(str(self.task1), 'Task 1')
        self.assertEqual(str(self.task2), 'Task 2')

class TaskListTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.task1 = Task.objects.create(title='Task 1', author_ip='127.0.0.1')
        self.task2 = Task.objects.create(title='Task 2', author_ip='192.168.1.1', done=True)

    def test_task_list_GET(self):
        response = self.client.get(reverse('task_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Task 1')
        self.assertContains(response, 'Task 2')

    def test_task_list_POST(self):
        response = self.client.post(reverse('task_list'), json.dumps({'title': 'New Task'}), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Task.objects.count(), 3)
        self.assertTrue(Task.objects.filter(title='New Task').exists())

class TaskDetailTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.task1 = Task.objects.create(title='Task 1', author_ip='127.0.0.1')
        self.task2 = Task.objects.create(title='Task 2', author_ip='192.168.1.1', done=True)

    def test_task_detail_GET(self):
        response = self.client.get(reverse('task_detail', kwargs={'task_id': self.task1.id}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Task 1')

    def test_task_detail_PUT(self):
        response = self.client.put(reverse('task_detail', kwargs={'task_id': self.task1.id}),
                                   json.dumps({'title': 'Updated Task', 'done': True}), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.task1.refresh_from_db()
        self.assertEqual(self.task1.title, 'Updated Task')
        self.assertEqual(self.task1.done, True)

    def test_task_detail_DELETE(self):
        response = self.client.delete(reverse('task_detail', kwargs={'task_id': self.task1.id}))
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Task.objects.filter(id=self.task1.id).exists())