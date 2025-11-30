import requests
import json
import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from store.models import Category, Supplier

def setup_supplier_data():
    # Ensure category exists
    category, _ = Category.objects.get_or_create(name="Stationery", slug="stationery")
    
    # Create supplier user
    username = "supplier_test"
    password = "password123"
    if not User.objects.filter(username=username).exists():
        user = User.objects.create_user(username=username, password=password)
        Supplier.objects.create(user=user, category=category)
        print(f"Created supplier user: {username}")
    else:
        print(f"Supplier user {username} already exists")

def test_supplier_api():
    session = requests.Session()
    
    # 1. Login
    login_url = 'http://localhost:8000/api/auth/login'
    payload = {"username": "supplier_test", "password": "password123"}
    
    print("Logging in as supplier...")
    res = session.post(login_url, json=payload)
    if res.status_code != 200:
        print(f"Login failed: {res.text}")
        return
    
    user_data = res.json()
    if not user_data.get('is_supplier'):
        print("FAILURE: User is not marked as supplier")
        return
    print("Login successful. User is supplier.")

    # 2. Get Products
    products_url = 'http://localhost:8000/api/store/supplier/products'
    print("Fetching supplier products...")
    res = session.get(products_url)
    if res.status_code != 200:
        print(f"Fetch failed: {res.text}")
        return
    
    products = res.json()
    print(f"Found {len(products)} products.")
    if len(products) > 0:
        product = products[0]
        print(f"Testing update on: {product['name']} (Stock: {product['stock']})")
        
        # 3. Update Stock
        update_url = f'http://localhost:8000/api/store/supplier/products/{product["id"]}/stock'
        new_stock = product['stock'] + 10
        print(f"Updating stock to {new_stock}...")
        
        res = session.patch(update_url, json={"stock": new_stock})
        if res.status_code == 200:
            updated_product = res.json()
            if updated_product['stock'] == new_stock:
                print("SUCCESS: Stock updated correctly.")
            else:
                print(f"FAILURE: Stock mismatch. Got {updated_product['stock']}")
        else:
            print(f"Update failed: {res.text}")

if __name__ == "__main__":
    setup_supplier_data()
    test_supplier_api()
