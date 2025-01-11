import requests
import json
import time

BASE_URL = "http://localhost:8080"

def test_registration():
    print("\nTesting Registration...")
    url = f"{BASE_URL}/api/Auth/register"
    data = {
        "email": f"test{int(time.time())}@example.com",
        "password": "Test123!",
        "firstName": "Test",
        "lastName": "User"
    }
    response = requests.post(url, json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
    return data

def test_login(credentials):
    print("\nTesting Login...")
    url = f"{BASE_URL}/api/Auth/login"
    data = {
        "email": credentials["email"],
        "password": credentials["password"]
    }
    response = requests.post(url, json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        return response.json()["token"]
    return None

def test_create_budget(token):
    print("\nTesting Budget Creation...")
    url = f"{BASE_URL}/api/Budget"
    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "name": "Test Budget",
        "categories": [
            {"name": "Groceries"},
            {"name": "Entertainment"}
        ]
    }
    response = requests.post(url, json=data, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")

def test_get_budgets(token):
    print("\nTesting Get Budgets...")
    url = f"{BASE_URL}/api/Budget"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")

def run_tests():
    print("Starting API Tests...")
    
    # Test registration
    credentials = test_registration()
    
    # Test login
    token = test_login(credentials)
    if not token:
        print("Login failed, cannot continue with budget tests")
        return
    
    # Test budget endpoints
    test_create_budget(token)
    test_get_budgets(token)

if __name__ == "__main__":
    run_tests()
