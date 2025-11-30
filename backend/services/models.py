from django.db import models
from django.conf import settings

class PrintJob(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PROCESSING', 'Processing'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    file = models.FileField(upload_to='print_jobs/')
    pages = models.PositiveIntegerField(default=1)
    is_color = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Print Job {self.id} ({self.status})"

class LaundryBooking(models.Model):
    STATUS_CHOICES = [
        ('BOOKED', 'Booked'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    machine_id = models.CharField(max_length=50)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='BOOKED')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Laundry {self.machine_id} - {self.start_time}"
