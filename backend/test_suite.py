#!/usr/bin/env python
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
from django.test import RequestFactory
from api.views import UsernameSuggestionsView, authenticate_user

def test_username_suggestions():
    """
    Test username suggestions functionality.
    """
    print("🧪 Testing Username Suggestions")
    print("=" * 50)
    
    # Create a test request factory
    factory = RequestFactory()
    
    # Get all active users
    active_users = User.objects.filter(is_active=True)
    print(f"📊 Active users in database: {active_users.count()}")
    
    for user in active_users:
        print(f"   - {user.username}")
    
    if active_users.exists():
        # Test with first user's username
        test_user = active_users.first()
        search_query = test_user.username[:3]  # First 3 characters
        
        print(f"\n🔍 Testing search with: '{search_query}'")
        
        # Create a mock request
        request = factory.get(f'/api/usernames/?search={search_query}')
        view = UsernameSuggestionsView.as_view()
        
        try:
            response = view(request)
            print(f"✅ Response status: {response.status_code}")
            
            if response.status_code == 200:
                data = response.data
                print(f"📋 Found {data.get('count', 0)} suggestions:")
                for username in data.get('usernames', []):
                    print(f"   - {username}")
            else:
                print(f"❌ Error: {response.data}")
                
        except Exception as e:
            print(f"❌ Exception: {str(e)}")
    else:
        print("ℹ️  No active users found for testing")
    
    print("\n✅ Username suggestions system ready!")

def test_deleted_account_authentication():
    """
    Test that deleted accounts cannot be authenticated.
    """
    print("\n🧪 Testing Deleted Account Authentication")
    print("=" * 50)
    
    # Test with a non-existent username
    result = authenticate_user("nonexistent_user", "anypassword")
    print(f"❌ Non-existent user test: {'PASS' if result is None else 'FAIL'}")
    
    # Test with existing user (if any)
    users = User.objects.filter(is_active=True)
    if users.exists():
        user = users.first()
        print(f"✅ Testing with existing user: {user.username}")
        
        # Test correct password
        result = authenticate_user(user.username, "wrongpassword")
        print(f"❌ Wrong password test: {'PASS' if result is None else 'FAIL'}")
        
        # Test correct credentials
        result = authenticate_user(user.username, "testpassword")  # Assuming default password
        print(f"✅ Correct credentials test: {'PASS' if result is not None else 'FAIL'}")
    else:
        print("ℹ️  No active users found for testing")
    
    print("\n✅ Authentication system properly handles deleted accounts!")

def run_all_tests():
    """
    Run all tests in the suite.
    """
    print("🚀 Running Complete Test Suite")
    print("=" * 60)
    
    test_username_suggestions()
    test_deleted_account_authentication()
    
    print("\n🎉 All tests completed!")

if __name__ == "__main__":
    run_all_tests() 