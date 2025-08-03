from django.urls import path
from .views import (
    hello, RegisterView, QuizSubmissionView, ProfileView, ChangePasswordView, 
    DeleteAccountView, CustomTokenObtainPairView, UsernameSuggestionsView,
    ProductListView, ProductDetailView, ProductCategoriesView,
    BlogListView, BlogDetailView, BlogCategoriesView, BlogEngagementView, BlogCreateView,
    JoinCommunityView, CommunityMemberCheckView,
    LookbookListView, LookbookDetailView, LookbookByStyleView, LookbookItemView,
    CreateRazorpayOrderView, VerifyRazorpayPaymentView
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
    path('community-member-check/', CommunityMemberCheckView.as_view(), name='community-member-check'),
    
    # Product API endpoints
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/categories/', ProductCategoriesView.as_view(), name='product-categories'),
    path('products/<str:product_id>/', ProductDetailView.as_view(), name='product-detail'),
    
    # Blog API endpoints
    path('blogs/', BlogListView.as_view(), name='blog-list'),
    path('blogs/create/', BlogCreateView.as_view(), name='blog-create'),
    path('blogs/categories/', BlogCategoriesView.as_view(), name='blog-categories'),
    path('blogs/<str:blog_slug>/', BlogDetailView.as_view(), name='blog-detail'),
    path('blogs/<str:blog_id>/engagement/', BlogEngagementView.as_view(), name='blog-engagement'),
    
    # Lookbook API endpoints
    path('lookbooks/', LookbookListView.as_view(), name='lookbook-list'),
    path('lookbooks/<str:lookbook_id>/', LookbookDetailView.as_view(), name='lookbook-detail'),
    path('lookbooks/style/<str:style_persona>/', LookbookByStyleView.as_view(), name='lookbook-by-style'),
    path('lookbooks/<str:lookbook_id>/items/', LookbookItemView.as_view(), name='lookbook-add-item'),
    path('lookbooks/<str:lookbook_id>/items/<str:item_id>/', LookbookItemView.as_view(), name='lookbook-remove-item'),
    # Razorpay payment endpoints
    path('create-razorpay-order/', CreateRazorpayOrderView.as_view(), name='create-razorpay-order'),
    path('verify-razorpay-payment/', VerifyRazorpayPaymentView.as_view(), name='verify-razorpay-payment'),
]
