import requests

def test_auth():
    session = requests.Session()
    
    # Login
    login_url = 'http://localhost:8000/api/auth/login'
    payload = {
        "username": "admin_test",
        "password": "password123"
    }
    
    print(f"Logging in to {login_url}...")
    response = session.post(login_url, json=payload)
    
    if response.status_code != 200:
        print(f"Login failed: {response.status_code}")
        print(response.text)
        return

    print("Login successful. Response:", response.json())
    
    # Get Me
    me_url = 'http://localhost:8000/api/auth/me'
    print(f"Fetching {me_url}...")
    response = session.get(me_url)
    
    if response.status_code != 200:
        print(f"Get Me failed: {response.status_code}")
        print(response.text)
        return

    print("Me Response:", response.json())

if __name__ == "__main__":
    test_auth()
