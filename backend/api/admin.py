from django.contrib import admin
from .models import UserProfile, Product, Blog, CommunityMember

admin.site.register(UserProfile)

# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'brand', 'price', 'stock_quantity', 'is_active', 'created_at')
    list_filter = ('category', 'brand', 'is_active', 'created_at')
    search_fields = ('name', 'description', 'brand')
    list_editable = ('price', 'stock_quantity', 'is_active')
    readonly_fields = ('id', 'created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'description', 'category', 'brand')
        }),
        ('Pricing & Stock', {
            'fields': ('price', 'stock_quantity', 'sku')
        }),
        ('Images', {
            'fields': ('image_url', 'image')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    ordering = ('-created_at',)


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'is_trending', 'is_published', 'is_featured', 'likes_count', 'views_count', 'published_at')
    list_filter = ('category', 'is_trending', 'is_published', 'is_featured', 'created_at', 'published_at')
    search_fields = ('title', 'author', 'content', 'excerpt', 'tags')
    list_editable = ('is_trending', 'is_published', 'is_featured')
    readonly_fields = ('id', 'created_at', 'updated_at', 'published_at', 'likes_count', 'comments_count', 'views_count', 'time_ago')
    prepopulated_fields = {'slug': ('title',)}
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'author', 'category', 'excerpt')
        }),
        ('Content', {
            'fields': ('content',),
            'classes': ('wide',)
        }),
        ('Media', {
            'fields': ('cover_image', 'cover_image_url'),
            'classes': ('collapse',)
        }),
        ('Status & Visibility', {
            'fields': ('is_published', 'is_trending', 'is_featured')
        }),
        ('SEO & Metadata', {
            'fields': ('meta_title', 'meta_description', 'tags'),
            'classes': ('collapse',)
        }),
        ('Engagement Metrics', {
            'fields': ('likes_count', 'comments_count', 'views_count', 'time_ago'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('id', 'created_at', 'updated_at', 'published_at'),
            'classes': ('collapse',)
        }),
    )
    
    ordering = ('-published_at', '-created_at')
    
    actions = ['mark_as_trending', 'mark_as_featured', 'publish_blogs', 'unpublish_blogs']
    
    def mark_as_trending(self, request, queryset):
        updated = queryset.update(is_trending=True)
        self.message_user(request, f'{updated} blog post(s) marked as trending.')
    mark_as_trending.short_description = "Mark selected blogs as trending"
    
    def mark_as_featured(self, request, queryset):
        updated = queryset.update(is_featured=True)
        self.message_user(request, f'{updated} blog post(s) marked as featured.')
    mark_as_featured.short_description = "Mark selected blogs as featured"
    
    def publish_blogs(self, request, queryset):
        from django.utils import timezone
        # For bulk updates, we need to handle published_at manually
        unpublished_blogs = queryset.filter(is_published=False)
        unpublished_blogs.update(is_published=True, published_at=timezone.now())
        
        # Update just is_published for already published blogs
        already_published = queryset.filter(is_published=True)
        already_published.update(is_published=True)
        
        total_updated = queryset.count()
        self.message_user(request, f'{total_updated} blog post(s) published.')
    publish_blogs.short_description = "Publish selected blogs"
    
    def unpublish_blogs(self, request, queryset):
        updated = queryset.update(is_published=False)
        self.message_user(request, f'{updated} blog post(s) unpublished.')
    unpublish_blogs.short_description = "Unpublish selected blogs"
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related()
    
    def save_model(self, request, obj, form, change):
        # The model's save method will handle published_at logic
        super().save_model(request, obj, form, change)


@admin.register(CommunityMember)
class CommunityMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'email', 'fashion_interest', 'agreed_to_terms', 'subscribe_newsletter', 'created_at')
    list_filter = ('fashion_interest', 'what_brings_you_here', 'agreed_to_terms', 'subscribe_newsletter', 'created_at')
    search_fields = ('name', 'user__username', 'email', 'bio', 'location')
    readonly_fields = ('user', 'created_at', 'updated_at')
    
    fieldsets = (
        ('User Information', {
            'fields': ('user', 'name', 'email', 'phone', 'location')
        }),
        ('Social Media & Online Presence', {
            'fields': ('instagram_handle', 'personal_website'),
            'classes': ('collapse',)
        }),
        ('Fashion & Community', {
            'fields': ('fashion_interest', 'what_brings_you_here', 'bio')
        }),
        ('Legal & Communication', {
            'fields': ('agreed_to_terms', 'subscribe_newsletter')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    ordering = ('-created_at',)
    
    actions = ['export_members', 'mark_newsletter_subscribers']
    
    def export_members(self, request, queryset):
        """Export selected members to CSV"""
        import csv
        from django.http import HttpResponse
        
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="community_members.csv"'
        
        writer = csv.writer(response)
        writer.writerow([
            'Name', 'Username', 'Email', 'Phone', 'Location', 
            'Fashion Interest', 'What Brings You Here', 'Instagram', 
            'Website', 'Bio', 'Agreed to Terms', 'Newsletter Subscriber', 
            'Joined Date'
        ])
        
        for member in queryset:
            writer.writerow([
                member.name,
                member.user.username,
                member.email,
                member.phone,
                member.location,
                member.fashion_interest,
                member.what_brings_you_here,
                member.instagram_handle,
                member.personal_website,
                member.bio,
                'Yes' if member.agreed_to_terms else 'No',
                'Yes' if member.subscribe_newsletter else 'No',
                member.created_at.strftime('%Y-%m-%d %H:%M:%S')
            ])
        
        return response
    export_members.short_description = "Export selected members to CSV"
    
    def mark_newsletter_subscribers(self, request, queryset):
        """Mark selected members as newsletter subscribers"""
        updated = queryset.update(subscribe_newsletter=True)
        self.message_user(request, f'{updated} member(s) marked as newsletter subscribers.')
    mark_newsletter_subscribers.short_description = "Mark as newsletter subscribers"
