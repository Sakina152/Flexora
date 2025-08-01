from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    UserProfile, Product, PostCategory, TrendingPost, 
    PostLike, PostComment, PostView, PostFavorite, TrendingAnalytics
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


class PostCategorySerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField()
    
    class Meta:
        model = PostCategory
        fields = '__all__'
    
    def get_posts_count(self, obj):
        return obj.posts.filter(status='published').count()


class PostCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    replies = serializers.SerializerMethodField()
    
    class Meta:
        model = PostComment
        fields = '__all__'
        read_only_fields = ['user', 'is_approved']
    
    def get_replies(self, obj):
        if obj.replies.exists():
            return PostCommentSerializer(obj.replies.all(), many=True).data
        return []


class TrendingPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = PostCategorySerializer(read_only=True)
    comments = PostCommentSerializer(many=True, read_only=True)
    is_liked = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()
    time_ago = serializers.ReadOnlyField()
    
    class Meta:
        model = TrendingPost
        fields = '__all__'
        read_only_fields = [
            'author', 'trending_score', 'likes_count', 
            'comments_count', 'views_count', 'is_trending'
        ]
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False
    
    def get_is_favorited(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.favorites.filter(user=request.user).exists()
        return False


class TrendingPostListSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = PostCategorySerializer(read_only=True)
    is_liked = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()
    time_ago = serializers.ReadOnlyField()
    
    class Meta:
        model = TrendingPost
        fields = [
            'id', 'title', 'slug', 'author', 'category', 'excerpt',
            'featured_image', 'image_gradient', 'likes_count', 
            'comments_count', 'views_count', 'is_trending', 
            'trending_score', 'created_at', 'is_liked', 'is_favorited',
            'time_ago'
        ]
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False
    
    def get_is_favorited(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.favorites.filter(user=request.user).exists()
        return False


class PostLikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post = TrendingPostSerializer(read_only=True)
    
    class Meta:
        model = PostLike
        fields = '__all__'
        read_only_fields = ['user']


class PostViewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post = TrendingPostSerializer(read_only=True)
    
    class Meta:
        model = PostView
        fields = '__all__'
        read_only_fields = ['user', 'ip_address', 'user_agent']


class PostFavoriteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post = TrendingPostSerializer(read_only=True)
    
    class Meta:
        model = PostFavorite
        fields = '__all__'
        read_only_fields = ['user']


class TrendingAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrendingAnalytics
        fields = '__all__'


class TrendingPostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrendingPost
        fields = [
            'title', 'category', 'content', 'excerpt', 'featured_image',
            'image_gradient', 'meta_title', 'meta_description', 'tags'
        ]
    
    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)


class PostCommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = ['content', 'parent']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data['post'] = self.context['post']
        return super().create(validated_data) 