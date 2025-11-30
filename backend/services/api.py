from typing import List
from ninja import Router, Schema
from datetime import datetime
from .models import PrintJob, LaundryBooking

router = Router()

class PrintJobSchema(Schema):
    id: int
    pages: int
    is_color: bool
    status: str
    created_at: datetime

class PrintJobCreateSchema(Schema):
    pages: int
    is_color: bool

class LaundryBookingSchema(Schema):
    id: int
    machine_id: str
    start_time: datetime
    end_time: datetime
    status: str

class LaundryBookingCreateSchema(Schema):
    machine_id: str
    start_time: datetime
    end_time: datetime

@router.post("/print", response=PrintJobSchema)
def create_print_job(request, payload: PrintJobCreateSchema):
    # Note: File upload handling will be added separately as it requires Form/File support
    job = PrintJob.objects.create(**payload.dict())
    return job

@router.post("/laundry", response=LaundryBookingSchema)
def create_laundry_booking(request, payload: LaundryBookingCreateSchema):
    booking = LaundryBooking.objects.create(**payload.dict())
    return booking

@router.get("/status/print/{job_id}", response=PrintJobSchema)
def get_print_job_status(request, job_id: int):
    return PrintJob.objects.get(id=job_id)
