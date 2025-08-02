import requests
import json

def test_registration():
    url = "http://127.0.0.1:8000/api/register/"
    
    # Test data
    data = {
        "username": "testuser123",
        "email": "test@example.com",
        "password": "TestPass123!",
        "phone": "1234567890",
        "address": "123 Test Street, Test City, TC 12345"
    }
    
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    try:
        print("Testing registration endpoint...")
        print(f"URL: {url}")
        print(f"Data: {json.dumps(data, indent=2)}")
        
        response = requests.post(url, json=data, headers=headers)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        try:
            response_data = response.json()
            print(f"Response Data: {json.dumps(response_data, indent=2)}")
        except json.JSONDecodeError as e:
            print(f"Failed to parse JSON response: {e}")
            print(f"Raw response: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_registration() 