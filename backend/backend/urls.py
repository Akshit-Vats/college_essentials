from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI
from store.api import router as store_router
from services.api import router as services_router
from core.api import router as core_router

api = NinjaAPI()
api.add_router("/store", store_router)
api.add_router("/services", services_router)
api.add_router("/auth", core_router)

@api.get("/hello")
def hello(request):
    return {"message": "Hello from Django Ninja!"}

from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Campus Essentials Backend is Running 🚀"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api.urls),
    path('', home),
]
