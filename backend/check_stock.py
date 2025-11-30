import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from store.models import Product

def check_stock():
    products = Product.objects.all()
    print(f"Found {products.count()} products:")
    for p in products:
        print(f"ID: {p.id} | Name: {p.name} | Stock: {p.stock} | Price: {p.price}")

if __name__ == "__main__":
    check_stock()
