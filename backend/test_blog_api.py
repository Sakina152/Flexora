#!/usr/bin/env python
"""
Test script for Blog API endpoints
Run this script to test the blog functionality
"""

import requests
import json

# Base URL for the API
BASE_URL = "http://localhost:8000/api"

def test_blog_endpoints():
    """Test all blog API endpoints"""
    
    print("🧪 Testing Blog API Endpoints")
    print("=" * 50)
    
    # Test 1: Get all blogs
    print("\n1. Testing GET /api/blogs/")
    try:
        response = requests.get(f"{BASE_URL}/blogs/")
        if response.status_code == 200:
            blogs = response.json()
            print(f"✅ Success! Found {len(blogs)} blogs")
            if blogs:
                print(f"   First blog: {blogs[0].get('title', 'No title')}")
        else:
            print(f"❌ Failed with status code: {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {str(e)}")
    
    # Test 2: Get blog categories
    print("\n2. Testing GET /api/blogs/categories/")
    try:
        response = requests.get(f"{BASE_URL}/blogs/categories/")
        if response.status_code == 200:
            categories = response.json()
            print(f"✅ Success! Found categories: {categories.get('categories', [])}")
        else:
            print(f"❌ Failed with status code: {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {str(e)}")
    
    # Test 3: Get trending blogs
    print("\n3. Testing GET /api/blogs/?trending=true")
    try:
        response = requests.get(f"{BASE_URL}/blogs/?trending=true")
        if response.status_code == 200:
            trending_blogs = response.json()
            print(f"✅ Success! Found {len(trending_blogs)} trending blogs")
        else:
            print(f"❌ Failed with status code: {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {str(e)}")
    
    # Test 4: Get blogs by category
    print("\n4. Testing GET /api/blogs/?category=Minimalist")
    try:
        response = requests.get(f"{BASE_URL}/blogs/?category=Minimalist")
        if response.status_code == 200:
            category_blogs = response.json()
            print(f"✅ Success! Found {len(category_blogs)} Minimalist blogs")
        else:
            print(f"❌ Failed with status code: {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {str(e)}")
    
    print("\n" + "=" * 50)
    print("🎉 Blog API testing completed!")

if __name__ == "__main__":
    test_blog_endpoints() 