"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))  # This adds /backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # This adds / (root)

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

application = get_asgi_application()
