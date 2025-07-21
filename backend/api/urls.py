from django.urls import path
from .views import hello, RegisterView, QuizSubmissionView, ProfileView, ChangePasswordView, DeleteAccountView, CustomTokenObtainPairView, UsernameSuggestionsView

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
]
