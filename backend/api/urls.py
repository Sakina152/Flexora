from django.urls import path
from .views import (
    hello, RegisterView, QuizSubmissionView, ProfileView, ChangePasswordView, 
    DeleteAccountView, CustomTokenObtainPairView, UsernameSuggestionsView,
    ProductListView, ProductDetailView, ProductCategoriesView,
    BlogListView, BlogDetailView, BlogCategoriesView, BlogEngagementView,
    JoinCommunityView
)

urlpatterns = [
    path('hello/', hello),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
    path('quiz/submit/', QuizSubmissionView.as_view(), name='quiz-submit'),
    path('usernames/', UsernameSuggestionsView.as_view(), name='username-suggestions'),
    path('join-community/', JoinCommunityView.as_view(), name='join-community'),
    
    # Product API endpoints
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/categories/', ProductCategoriesView.as_view(), name='product-categories'),
    path('products/<str:product_id>/', ProductDetailView.as_view(), name='product-detail'),
    
    # Blog API endpoints
    path('blogs/', BlogListView.as_view(), name='blog-list'),
    path('blogs/categories/', BlogCategoriesView.as_view(), name='blog-categories'),
    path('blogs/<str:blog_slug>/', BlogDetailView.as_view(), name='blog-detail'),
    path('blogs/<str:blog_id>/engagement/', BlogEngagementView.as_view(), name='blog-engagement'),
]
