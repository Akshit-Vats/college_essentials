import sqlite3
import json
import os

db_path = 'db.sqlite3'

if not os.path.exists(db_path):
    print(f"Error: {db_path} not found.")
    exit(1)

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Fetch Categories
    cursor.execute("SELECT id, name, slug, image_url FROM store_category")
    categories = []
    for row in cursor.fetchall():
        categories.append({
            "id": row[0],
            "name": row[1],
            "slug": row[2],
            "image_url": row[3]
        })

    # Fetch Products
    cursor.execute("SELECT id, name, description, price, stock, category_id, image_url FROM store_product")
    products = []
    for row in cursor.fetchall():
        products.append({
            "id": row[0],
            "name": row[1],
            "description": row[2],
            "price": row[3],
            "stock": row[4],
            "category_id": row[5],
            "image_url": row[6]
        })

    with open('local_data_dump.txt', 'w', encoding='utf-8') as f:
        f.write("=== CATEGORIES ===\n")
        for c in categories:
            f.write(f"ID: {c['id']} | Name: {c['name']} | Slug: {c['slug']}\n")
            if c['image_url']: f.write(f"Image: {c['image_url']}\n")
            f.write("-" * 20 + "\n")

        f.write("\n=== PRODUCTS ===\n")
        for p in products:
            cat_name = next((c['name'] for c in categories if c['id'] == p['category_id']), "Unknown")
            f.write(f"Category: {cat_name}\n")
            f.write(f"Name: {p['name']}\n")
            f.write(f"Price: {p['price']}\n")
            f.write(f"Stock: {p['stock']}\n")
            f.write(f"Description: {p['description']}\n")
            if p['image_url']: f.write(f"Image: {p['image_url']}\n")
            f.write("-" * 20 + "\n")
            
    print("Data dumped to local_data_dump.txt")

    conn.close()

except sqlite3.OperationalError as e:
    print(f"Database error: {e}")
    print("Tables might not exist or are named differently.")
