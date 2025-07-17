from django.urls import path
from .views import hello, RegisterView, QuizSubmissionView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('hello/', hello),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('quiz/submit/', QuizSubmissionView.as_view(), name='quiz-submit'),
]
