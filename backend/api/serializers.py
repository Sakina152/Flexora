from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    UserProfile, Product, Blog, CommunityMember
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class BlogSerializer(serializers.ModelSerializer):
    time_ago = serializers.ReadOnlyField()
    
    class Meta:
        model = Blog
        fields = [
            'id', 'title', 'slug', 'author', 'content', 'excerpt', 'category',
            'cover_image', 'cover_image_url', 'likes_count', 'comments_count', 
            'views_count', 'is_trending', 'is_published', 'is_featured',
            'meta_title', 'meta_description', 'tags', 'created_at', 
            'updated_at', 'published_at', 'time_ago'
        ]


class BlogListSerializer(serializers.ModelSerializer):
    time_ago = serializers.ReadOnlyField()
    
    class Meta:
        model = Blog
        fields = [
            'id', 'title', 'slug', 'author', 'excerpt', 'category',
            'cover_image', 'cover_image_url', 'likes_count', 'comments_count', 
            'views_count', 'is_trending', 'is_published', 'is_featured',
            'created_at', 'time_ago'
        ]


class CommunityMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = CommunityMember
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data) 