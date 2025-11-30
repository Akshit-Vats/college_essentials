import os
import django
import sys
import argparse

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from store.models import Category, Supplier

def create_supplier(username, password, category_name):
    # 1. Find Category
    try:
        category = Category.objects.get(name__iexact=category_name)
    except Category.DoesNotExist:
        print(f"Error: Category '{category_name}' not found.")
        print("Available categories:", ", ".join([c.name for c in Category.objects.all()]))
        return

    # 2. Create or Get User
    user, created = User.objects.get_or_create(username=username)
    if created:
        user.set_password(password)
        user.save()
        print(f"Created new user: {username}")
    else:
        print(f"User {username} already exists.")

    # 3. Assign Supplier Role
    if hasattr(user, 'supplier_profile'):
        current_cat = user.supplier_profile.category.name
        print(f"User {username} is already a supplier for '{current_cat}'.")
        return

    Supplier.objects.create(user=user, category=category)
    print(f"SUCCESS: Assigned {username} as supplier for '{category.name}'.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Create a new supplier.')
    parser.add_argument('username', help='Username for the supplier')
    parser.add_argument('password', help='Password for the supplier')
    parser.add_argument('category', help='Category name (e.g., "Stationery")')
    
    args = parser.parse_args()
    create_supplier(args.username, args.password, args.category)
