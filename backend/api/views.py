from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

def hello(request):
    return JsonResponse({"message": "Hello from Django backend!"})

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        if not username or not password or not email:
            return Response({'error': 'Username, email, and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=username, password=password, email=email)
        return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)

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
