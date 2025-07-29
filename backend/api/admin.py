from django.contrib import admin
from .models import UserProfile, Product

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
