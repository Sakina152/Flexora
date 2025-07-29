from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from .models import UserProfile, Product
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
import os
from rest_framework import serializers

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'description', 'image_url', 'image', 'category', 'brand', 'stock_quantity', 'sku', 'is_active', 'created_at', 'updated_at']

# Product API Views
class ProductListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Get all products or filter by category"""
        try:
            category = request.GET.get('category')
            featured = request.GET.get('featured')
            
            products = Product.objects.filter(is_active=True)
            
            if category:
                products = products.filter(category=category)
            
            if featured:
                # For now, we'll consider products with higher stock as featured
                # You can add a featured field to the Product model later
                products = products.filter(stock_quantity__gt=20)
            
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({
                'error': 'Failed to fetch products',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductDetailView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, product_id):
        """Get a specific product by ID"""
        try:
            product = Product.objects.get(id=product_id, is_active=True)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
            
        except Product.DoesNotExist:
            return Response({
                'error': 'Product not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'error': 'Failed to fetch product',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductCategoriesView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Get all available product categories"""
        try:
            categories = Product.objects.filter(is_active=True).values_list('category', flat=True).distinct()
            return Response({
                'categories': list(categories)
            })
            
        except Exception as e:
            return Response({
                'error': 'Failed to fetch categories',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def hello(request):
    return JsonResponse({"message": "Hello from Django backend!"})

# Custom authentication function to ensure deleted accounts are not considered
def authenticate_user(username, password):
    """
    Custom authentication that ensures deleted accounts are not considered.
    """
    try:
        # Check if user exists and is active
        user = User.objects.filter(username=username, is_active=True).first()
        if not user:
            return None
        
        # Verify password
        if user.check_password(password):
            return user
        return None
    except Exception:
        return None

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom token view that uses our authentication function.
    """
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        # Use custom authentication
        user = authenticate_user(username, password)
        
        if user:
            # Generate tokens
            from rest_framework_simplejwt.tokens import RefreshToken
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'username': user.username,
                    'email': user.email
                }
            })
        else:
            return Response({
                'detail': 'No active account found with the given credentials.'
            }, status=status.HTTP_401_UNAUTHORIZED)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            print(f"Registration request data: {request.data}")
            
            username = request.data.get('username')
            password = request.data.get('password')
            email = request.data.get('email')
            phone = request.data.get('phone')
            address = request.data.get('address')
            
            print(f"Extracted data - Username: {username}, Email: {email}, Phone: {phone}, Address: {address}")
            
            # Validate required fields
            if not username or not password or not email or not phone or not address:
                missing_fields = []
                if not username: missing_fields.append('username')
                if not password: missing_fields.append('password')
                if not email: missing_fields.append('email')
                if not phone: missing_fields.append('phone')
                if not address: missing_fields.append('address')
                
                error_msg = f'Missing required fields: {", ".join(missing_fields)}'
                print(f"Validation error: {error_msg}")
                return Response({'error': error_msg}, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if username already exists
            if User.objects.filter(username=username).exists():
                print(f"Username already exists: {username}")
                return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create user
            print(f"Creating user: {username}")
            user = User.objects.create_user(username=username, password=password, email=email)
            
            # Create user profile
            print(f"Creating profile for user: {username}")
            profile = UserProfile.objects.create(user=user, phone=phone, address=address)
            
            print(f"User registered successfully: {username}")
            return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            print(f"Registration error: {str(e)}")
            return Response({'error': f'Registration failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@method_decorator(csrf_exempt, name='dispatch')
class QuizSubmissionView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = request.data
            answers = data.get('answers', [])
            persona = data.get('persona', '')
            timestamp = data.get('timestamp', '')

            # Here you could save to database if you have a model
            # For now, we'll just return a success response
            
            # Log the submission (in a real app, you'd save to database)
            print(f"Quiz submitted - Persona: {persona}, Answers: {answers}, Timestamp: {timestamp}")
            
            return Response({
                'message': 'Quiz submitted successfully',
                'persona': persona,
                'answers': answers,
                'timestamp': timestamp
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': 'Failed to submit quiz',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Login will use TokenObtainPairView from SimpleJWT

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = getattr(user, 'profile', None)
        data = {
            'username': user.username,
            'email': user.email,
            'date_joined': user.date_joined.isoformat(),
        }
        if profile:
            data['phone'] = profile.phone
            data['address'] = profile.address
            if profile.profile_picture:
                profile_picture_url = request.build_absolute_uri(profile.profile_picture.url)
                print(f"Profile picture URL: {profile_picture_url}")
                data['profile_picture'] = profile_picture_url
            else:
                print("No profile picture found")
            if profile.selected_avatar:
                data['selected_avatar'] = profile.selected_avatar
            if profile.account_type:
                data['account_type'] = profile.account_type
        else:
            print("No profile found for user")
        print(f"Profile data being sent: {data}")
        return Response(data)

    def put(self, request):
        user = request.user
        profile = getattr(user, 'profile', None)
        username = request.data.get('username')
        email = request.data.get('email')
        phone = request.data.get('phone')
        address = request.data.get('address')
        selected_avatar = request.data.get('selected_avatar')
        account_type = request.data.get('account_type')
        
        if username and username != user.username:
            if User.objects.filter(username=username).exclude(pk=user.pk).exists():
                return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            user.username = username
        if email:
            user.email = email
        user.save()
        
        if not profile:
            profile = UserProfile.objects.create(user=user)
        if phone is not None:
            profile.phone = phone
        if address is not None:
            profile.address = address
        if selected_avatar is not None:
            profile.selected_avatar = selected_avatar
        if account_type is not None:
            profile.account_type = account_type
        profile.save()
        
        # Handle profile picture upload
        if 'profile_picture' in request.FILES:
            # Delete old profile picture if exists
            if profile.profile_picture:
                if os.path.exists(profile.profile_picture.path):
                    os.remove(profile.profile_picture.path)
            profile.profile_picture = request.FILES['profile_picture']
            profile.save()
        
        return Response({'message': 'Profile updated successfully.'})

class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        password = request.data.get('password')
        
        if not password:
            return Response({'error': 'Password is required to delete account.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.check_password(password):
            return Response({'error': 'Incorrect password.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Delete profile picture if exists
        profile = getattr(user, 'profile', None)
        if profile and profile.profile_picture:
            if os.path.exists(profile.profile_picture.path):
                os.remove(profile.profile_picture.path)
        
        # Delete user (this will also delete the profile due to CASCADE)
        user.delete()
        
        return Response({'message': 'Account deleted successfully.'})

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')
        if not current_password or not new_password or not confirm_password:
            return Response({'error': 'All password fields are required.'}, status=status.HTTP_400_BAD_REQUEST)
        if new_password != confirm_password:
            return Response({'error': 'New passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)
        if not user.check_password(current_password):
            return Response({'error': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password changed successfully.'})

class UsernameSuggestionsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        """
        Get username suggestions for active accounts only.
        """
        try:
            search_query = request.GET.get('search', '').strip()
            
            # Get active users - all if no search query, filtered if search provided
            if search_query:
                users = User.objects.filter(
                    username__icontains=search_query,
                    is_active=True
                ).values_list('username', flat=True)[:10]  # Limit to 10 suggestions
            else:
                # Return all active usernames when no search query
                users = User.objects.filter(
                    is_active=True
                ).values_list('username', flat=True)[:20]  # Limit to 20 for all users
            
            usernames = list(users)
            
            return Response({
                'usernames': usernames,
                'count': len(usernames),
                'search_query': search_query
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': 'Failed to fetch username suggestions',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
