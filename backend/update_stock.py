import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from store.models import Product

def update_stock():
    count = Product.objects.update(stock=100)
    print(f"Updated stock for {count} products to 100.")

if __name__ == "__main__":
    update_stock()
