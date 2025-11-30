import requests
import json

def test_stock_update():
    session = requests.Session()
    product_id = 17
    
    # 1. Login
    login_url = 'http://localhost:8000/api/auth/login'
    payload = {"username": "admin_test", "password": "password123"}
    session.post(login_url, json=payload)

    # 2. Get Initial Stock
    product_url = f'http://localhost:8000/api/store/products/{product_id}'
    res = session.get(product_url)
    initial_stock = res.json()['stock']
    print(f"Initial Stock: {initial_stock}")

    # 3. Place Order (Qty: 1)
    order_url = 'http://localhost:8000/api/store/orders'
    order_payload = {
        "items": [{"product_id": product_id, "quantity": 1}],
        "shipping_address": "Test Address"
    }
    print("Placing order for 1 item...")
    res = session.post(order_url, json=order_payload)
    if res.status_code != 200:
        print(f"Order failed: {res.text}")
        return

    # 4. Get Final Stock
    res = session.get(product_url)
    final_stock = res.json()['stock']
    print(f"Final Stock: {final_stock}")

    if final_stock == initial_stock - 1:
        print("SUCCESS: Stock decremented correctly.")
    else:
        print("FAILURE: Stock did not update correctly.")

if __name__ == "__main__":
    test_stock_update()
