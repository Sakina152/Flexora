from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    UserProfile, Product, Blog, CommunityMember, Lookbook, LookbookItem
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


class LookbookItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.UUIDField(write_only=True)
    
    class Meta:
        model = LookbookItem
        fields = ['id', 'product', 'product_id', 'added_at', 'order']
        read_only_fields = ['id', 'added_at']


class LookbookSerializer(serializers.ModelSerializer):
    items = LookbookItemSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    items_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Lookbook
        fields = ['id', 'title', 'description', 'style_persona', 'is_active', 
                 'created_at', 'updated_at', 'user', 'items', 'items_count']
        read_only_fields = ['id', 'created_at', 'updated_at', 'user']
    
    def get_items_count(self, obj):
        return obj.items.count()
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class LookbookListSerializer(serializers.ModelSerializer):
    items_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Lookbook
        fields = ['id', 'title', 'description', 'style_persona', 'is_active', 
                 'created_at', 'updated_at', 'items_count']
    
    def get_items_count(self, obj):
        return obj.items.count()


class CommunityMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = CommunityMember
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)