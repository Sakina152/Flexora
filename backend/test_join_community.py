#!/usr/bin/env python
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import CommunityMember
from api.serializers import CommunityMemberSerializer

def test_community_member_creation():
    """Test creating a community member"""
    try:
        # Create a test user
        user, created = User.objects.get_or_create(
            username='testuser',
            defaults={'email': 'test@example.com'}
        )
        
        # Test data
        test_data = {
            'name': 'Test User',
            'email': 'test@example.com',
            'phone': '+1234567890',
            'location': 'Test City',
            'instagram_handle': '@testuser',
            'personal_website': 'https://test.com',
            'fashion_interest': 'Streetwear',
            'what_brings_you_here': 'Discover new styles',
            'bio': 'Test bio',
            'agreed_to_terms': True,
            'subscribe_newsletter': True,
        }
        
        # Test serializer
        serializer = CommunityMemberSerializer(data=test_data)
        if serializer.is_valid():
            print("✅ Serializer validation passed")
            print(f"Validated data: {serializer.validated_data}")
        else:
            print("❌ Serializer validation failed")
            print(f"Errors: {serializer.errors}")
            return False
        
        # Test model creation
        member = CommunityMember.objects.create(
            user=user,
            **test_data
        )
        print(f"✅ Community member created: {member}")
        
        # Clean up
        member.delete()
        if created:
            user.delete()
        
        print("✅ All tests passed!")
        return True
        
    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        return False

if __name__ == '__main__':
    test_community_member_creation() 