from django.db import models
from django.contrib.auth.models import User
import uuid
from django.utils.text import slugify

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    selected_avatar = models.CharField(max_length=20, blank=True, null=True)
    account_type = models.CharField(max_length=50, blank=True, null=True)
    # Add more fields as needed

    def __str__(self):
        return f"Profile of {self.user.username}"


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image_url = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    # Optional fields for better product management
    category = models.CharField(max_length=100, blank=True, null=True)
    brand = models.CharField(max_length=100, blank=True, null=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    sku = models.CharField(max_length=50, unique=True, blank=True, null=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        # Auto-generate SKU if not provided
        if not self.sku:
            self.sku = f"PROD-{self.id.hex[:8].upper()}"
        super().save(*args, **kwargs)


class Blog(models.Model):
    CATEGORY_CHOICES = [
        ('Minimalist', 'Minimalist'),
        ('Vintage', 'Vintage'),
        ('Streetwear', 'Streetwear'),
        ('Bohemian', 'Bohemian'),
        ('Formal', 'Formal'),
        ('Casual', 'Casual'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    author = models.CharField(max_length=100)
    content = models.TextField()
    excerpt = models.TextField(max_length=500, blank=True, help_text="Short summary of the blog post")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    
    # Media
    cover_image = models.ImageField(upload_to='blog_covers/', blank=True, null=True)
    cover_image_url = models.URLField(blank=True, null=True, help_text="Alternative to uploaded image")
    
    # Engagement metrics
    likes_count = models.PositiveIntegerField(default=0)
    comments_count = models.PositiveIntegerField(default=0)
    views_count = models.PositiveIntegerField(default=0)
    
    # Status and visibility
    is_trending = models.BooleanField(default=False, help_text="Mark as trending to show in trending section")
    is_published = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False, help_text="Mark as featured for homepage display")
    
    # SEO and metadata
    meta_title = models.CharField(max_length=60, blank=True, help_text="SEO title (max 60 characters)")
    meta_description = models.CharField(max_length=160, blank=True, help_text="SEO description (max 160 characters)")
    tags = models.CharField(max_length=255, blank=True, help_text="Comma-separated tags")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-published_at', '-created_at']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Auto-generate slug if not provided
        if not self.slug:
            self.slug = slugify(self.title)
        
        # Auto-generate excerpt if not provided
        if not self.excerpt:
            self.excerpt = self.content[:200] + "..." if len(self.content) > 200 else self.content
        
        # Auto-generate meta fields if not provided
        if not self.meta_title:
            self.meta_title = self.title[:60]
        if not self.meta_description:
            self.meta_description = self.excerpt[:160]
        
        # Set published_at when blog is published for the first time
        if self.is_published and not self.published_at:
            from django.utils import timezone
            self.published_at = timezone.now()
        
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return f"/trending/{self.slug}"
    
    @property
    def time_ago(self):
        """Returns a human-readable time ago string"""
        from django.utils import timezone
        from datetime import timedelta
        
        if not self.published_at:
            return "Not published yet"
        
        now = timezone.now()
        diff = now - self.published_at
        
        if diff.days > 0:
            return f"{diff.days} day{'s' if diff.days != 1 else ''} ago"
        elif diff.seconds >= 3600:
            hours = diff.seconds // 3600
            return f"{hours} hour{'s' if hours != 1 else ''} ago"
        elif diff.seconds >= 60:
            minutes = diff.seconds // 60
            return f"{minutes} minute{'s' if minutes != 1 else ''} ago"
        else:
            return "Just now"


class Lookbook(models.Model):
    STYLE_CHOICES = [
        ('minimalist-style', 'Minimalist Style'),
        ('bohemian-style', 'Bohemian Style'),
        ('vintage-style', 'Vintage Style'),
        ('casual-style', 'Casual Style'),
        ('streetwear-style', 'Streetwear Style'),
        ('formal-style', 'Formal Style'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lookbooks')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    style_persona = models.CharField(max_length=50, choices=STYLE_CHOICES)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['user', 'style_persona']  # One lookbook per style per user
    
    def __str__(self):
        return f"{self.title} - {self.user.username}"


class LookbookItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lookbook = models.ForeignKey(Lookbook, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)
    order = models.PositiveIntegerField(default=0)  # For ordering items in lookbook
    
    class Meta:
        ordering = ['order', 'added_at']
        unique_together = ['lookbook', 'product']  # Prevent duplicate products in same lookbook
    
    def __str__(self):
        return f"{self.product.name} in {self.lookbook.title}"


class CommunityMember(models.Model):
    FASHION_INTEREST_CHOICES = [
        ('Streetwear', 'Streetwear'),
        ('Vintage', 'Vintage'),
        ('Minimalist', 'Minimalist'),
        ('Bohemian', 'Bohemian'),
        ('Formal/Elegant', 'Formal/Elegant'),
        ('Casual', 'Casual'),
        ('Sustainable Fashion', 'Sustainable Fashion'),
        ('High Fashion', 'High Fashion'),
        ('Street Style', 'Street Style'),
        ('Other', 'Other'),
    ]
    
    WHAT_BRINGS_YOU_CHOICES = [
        ('Discover new styles', 'Discover new styles'),
        ('Connect with fashion community', 'Connect with fashion community'),
        ('Showcase my designs', 'Showcase my designs'),
        ('Learn about fashion trends', 'Learn about fashion trends'),
        ('Find inspiration', 'Find inspiration'),
        ('Network with students', 'Network with students'),
        ('Support student designers', 'Support student designers'),
        ('Other', 'Other'),
    ]
    
    # User relationship
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='community_member')
    
    # Personal Information
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=255, blank=True)
    
    # Social Media & Online Presence
    instagram_handle = models.CharField(max_length=100, blank=True)
    personal_website = models.URLField(blank=True)
    
    # Fashion & Community
    fashion_interest = models.CharField(max_length=50, choices=FASHION_INTEREST_CHOICES, blank=True)
    what_brings_you_here = models.CharField(max_length=100, choices=WHAT_BRINGS_YOU_CHOICES, blank=True)
    bio = models.TextField(blank=True)
    
    # Legal & Communication
    agreed_to_terms = models.BooleanField(default=False)
    subscribe_newsletter = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Community Member'
        verbose_name_plural = 'Community Members'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.user.username})"
    
    @property
    def is_active_member(self):
        """Check if member is active (has agreed to terms)"""
        return self.agreed_to_terms
