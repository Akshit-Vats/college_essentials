import requests
import json

def test_admin_orders():
    session = requests.Session()
    
    # 1. Login as Admin
    login_url = 'http://localhost:8000/api/auth/login'
    payload = {
        "username": "admin_test",
        "password": "password123"
    }
    
    print(f"Logging in as admin...")
    response = session.post(login_url, json=payload)
    if response.status_code != 200:
        print(f"Login failed: {response.status_code} {response.text}")
        return
    print("Login successful.")

    # 2. Fetch Admin Orders
    orders_url = 'http://localhost:8000/api/store/admin/orders'
    print(f"Fetching orders from {orders_url}...")
    response = session.get(orders_url)
    
    if response.status_code != 200:
        print(f"Fetch failed: {response.status_code}")
        print(f"Response: {response.text}")
    else:
        print("Orders fetched successfully!")
        orders = response.json()
        print(f"Found {len(orders)} orders.")
        print(json.dumps(orders, indent=2))

if __name__ == "__main__":
    test_admin_orders()
