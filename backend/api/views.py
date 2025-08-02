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
from .models import UserProfile, Product, Blog, CommunityMember
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
import os
from rest_framework import serializers
from django.db.models import F

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'description', 'image_url', 'image', 'category', 'brand', 'stock_quantity', 'sku', 'is_active', 'created_at', 'updated_at']

# Blog Serializer
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

# Blog API Views
class BlogListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Get all published blogs with optional filtering"""
        try:
            category = request.GET.get('category')
            trending = request.GET.get('trending')
            featured = request.GET.get('featured')
            limit = request.GET.get('limit', 20)
            
            blogs = Blog.objects.filter(is_published=True)
            
            if category:
                blogs = blogs.filter(category=category)
            
            if trending:
                blogs = blogs.filter(is_trending=True)
            
            if featured:
                blogs = blogs.filter(is_featured=True)
            
            # Limit results
            try:
                limit = int(limit)
                blogs = blogs[:limit]
            except ValueError:
                blogs = blogs[:20]
            
            serializer = BlogSerializer(blogs, many=True)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({
                'error': 'Failed to fetch blogs',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BlogDetailView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, blog_slug):
        """Get a specific blog by slug and increment view count"""
        try:
            blog = Blog.objects.get(slug=blog_slug, is_published=True)
            
            # Increment view count
            blog.views_count = F('views_count') + 1
            blog.save()
            blog.refresh_from_db()
            
            serializer = BlogSerializer(blog)
            return Response(serializer.data)
            
        except Blog.DoesNotExist:
            return Response({
                'error': 'Blog not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'error': 'Failed to fetch blog',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BlogCategoriesView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Get all available blog categories"""
        try:
            categories = Blog.objects.filter(is_published=True).values_list('category', flat=True).distinct()
            return Response({
                'categories': list(categories)
            })
            
        except Exception as e:
            return Response({
                'error': 'Failed to fetch blog categories',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BlogEngagementView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, blog_id):
        """Handle blog engagement (likes, comments)"""
        try:
            action = request.data.get('action')  # 'like' or 'comment'
            
            try:
                blog = Blog.objects.get(id=blog_id, is_published=True)
            except Blog.DoesNotExist:
                return Response({
                    'error': 'Blog not found'
                }, status=status.HTTP_404_NOT_FOUND)
            
            if action == 'like':
                blog.likes_count = F('likes_count') + 1
                blog.save()
                blog.refresh_from_db()
                return Response({
                    'message': 'Blog liked successfully',
                    'likes_count': blog.likes_count
                })
            
            elif action == 'comment':
                blog.comments_count = F('comments_count') + 1
                blog.save()
                blog.refresh_from_db()
                return Response({
                    'message': 'Comment added successfully',
                    'comments_count': blog.comments_count
                })
            
            else:
                return Response({
                    'error': 'Invalid action. Use "like" or "comment"'
                }, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({
                'error': 'Failed to update engagement',
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


class JoinCommunityView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """
        Handle join community form submission
        """
        try:
            print(f"Join community request received from user: {request.user.username}")
            print(f"Request data: {request.data}")
            
            # Check if user is already a community member
            if hasattr(request.user, 'community_member'):
                print(f"User {request.user.username} is already a community member")
                return Response({
                    'error': 'You are already a community member.'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Validate required fields
            required_fields = ['name', 'email', 'agreeToTerms']
            for field in required_fields:
                if not request.data.get(field):
                    print(f"Missing required field: {field}")
                    return Response({
                        'error': f'{field} is required.'
                    }, status=status.HTTP_400_BAD_REQUEST)
            
            # Create community member
            from .serializers import CommunityMemberSerializer
            
            # Prepare data for serializer
            member_data = {
                'name': request.data.get('name'),
                'email': request.data.get('email'),
                'phone': request.data.get('phone', ''),
                'location': request.data.get('location', ''),
                'instagram_handle': request.data.get('instagram', ''),
                'personal_website': request.data.get('website', ''),
                'fashion_interest': request.data.get('fashionInterest', ''),
                'what_brings_you_here': request.data.get('whatBringsYouHere', ''),
                'bio': request.data.get('bio', ''),
                'agreed_to_terms': request.data.get('agreeToTerms', False),
                'subscribe_newsletter': request.data.get('subscribeNewsletter', False),
            }
            
            print(f"Prepared member data: {member_data}")
            
            serializer = CommunityMemberSerializer(data=member_data, context={'request': request})
            
            if serializer.is_valid():
                print("Serializer is valid, saving member...")
                member = serializer.save()
                print(f"Successfully created community member: {member}")
                return Response({
                    'message': 'Successfully joined the Flexora community!',
                    'member': serializer.data
                }, status=status.HTTP_201_CREATED)
            else:
                print(f"Serializer errors: {serializer.errors}")
                return Response({
                    'error': 'Invalid data provided.',
                    'details': serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            print(f"Error in join community: {str(e)}")
            return Response({
                'error': 'Failed to join community.',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get(self, request):
        """
        Check if user is already a community member
        """
        try:
            if hasattr(request.user, 'community_member'):
                from .serializers import CommunityMemberSerializer
                serializer = CommunityMemberSerializer(request.user.community_member)
                return Response({
                    'is_member': True,
                    'member': serializer.data
                })
            else:
                return Response({
                    'is_member': False
                })
        except Exception as e:
            return Response({
                'error': 'Failed to check membership status.',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
