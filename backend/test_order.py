import requests
import json

def test_order():
    session = requests.Session()
    
    # 1. Login
    login_url = 'http://localhost:8000/api/auth/login'
    # Using the superuser we created earlier
    payload = {
        "username": "admin_test",
        "password": "password123"
    }
    
    print(f"Logging in...")
    response = session.post(login_url, json=payload)
    if response.status_code != 200:
        print(f"Login failed: {response.status_code} {response.text}")
        return
    print("Login successful.")

    # 2. Place Order
    order_url = 'http://localhost:8000/api/store/orders'
    # Assuming product ID 17 exists (from previous stock check)
    order_payload = {
        "items": [
            {"product_id": 17, "quantity": 1}
        ],
        "shipping_address": "Test Hostel, Room 101"
    }
    
    print(f"Placing order...")
    response = session.post(order_url, json=order_payload)
    
    if response.status_code != 200:
        print(f"Order failed: {response.status_code}")
        print(f"Response: {response.text}")
    else:
        print("Order placed successfully!")
        print(json.dumps(response.json(), indent=2))

if __name__ == "__main__":
    test_order()
