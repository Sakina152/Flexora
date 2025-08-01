from django.core.management.base import BaseCommand
from api.models import Blog
from django.utils import timezone
import uuid

class Command(BaseCommand):
    help = 'Populate the database with sample blog posts'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample blog posts...')
        
        sample_blogs = [
            {
                'title': 'Minimalist Wardrobe: Capsule Collection',
                'author': 'Emma Chen',
                'content': '''
                Discover the art of minimalism in fashion. A capsule wardrobe consists of versatile pieces that can be mixed and matched to create countless outfits.
                
                Key Elements:
                • Neutral color palette
                • High-quality basics
                • Versatile silhouettes
                • Timeless designs
                
                Building a minimalist wardrobe starts with understanding your personal style and investing in pieces that truly serve you.
                ''',
                'category': 'Minimalist',
                'is_trending': True,
                'likes_count': 156,
                'comments_count': 12,
                'views_count': 1200,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023681/ed6992640292b1390dacd70bd14eb883_eomvq3.jpg'
                ],
            },
            {
                'title': 'Vintage Revival: Retro Inspirations',
                'author': 'Sophie Laurent',
                'content': '''
                Vintage fashion is making a comeback with modern twists. Learn how to incorporate retro elements into your contemporary wardrobe.
                
                Vintage Elements:
                • High-waisted silhouettes
                • Retro prints and patterns
                • Classic accessories
                • Timeless color combinations
                
                The key to vintage style is balancing retro elements with modern sensibilities.
                ''',
                'category': 'Vintage',
                'is_trending': True,
                'likes_count': 267,
                'comments_count': 35,
                'views_count': 1800,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023754/1458452e3a59cfcd7de95a391dbf8f3c_wu9tob.jpg'
                ],
            },
            {
                'title': 'Streetwear Essentials: Urban Style Guide',
                'author': 'Alex Rivera',
                'content': '''
                Streetwear has evolved from subculture to mainstream fashion. Learn the fundamentals of urban style and street fashion.
                
                Streetwear Basics:
                • Oversized silhouettes
                • Graphic elements
                • Comfortable materials
                • Athletic influences
                
                Streetwear is about expressing individuality through bold choices and comfortable style.
                ''',
                'category': 'Streetwear',
                'is_trending': True,
                'likes_count': 189,
                'comments_count': 23,
                'views_count': 1500,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023828/be2838c5be147c154656b2a6759c5cbb_uasjgn.jpg'
                ],
            },
            {
                'title': 'Bohemian Dreams: Free-Spirited Fashion',
                'author': 'Luna Moon',
                'content': '''
                Bohemian style celebrates creativity, freedom, and artistic expression. Discover how to embrace the boho aesthetic.
                
                Boho Elements:
                • Flowing fabrics
                • Natural materials
                • Artistic prints
                • Layered accessories
                
                Bohemian fashion is about expressing your creative spirit through eclectic, artistic choices.
                ''',
                'category': 'Bohemian',
                'is_trending': True,
                'likes_count': 234,
                'comments_count': 28,
                'views_count': 1600,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023898/d89c9c96b2e3cd6fed259664e60527e3_jpsdyt.jpg'
                ],
            },
            {
                'title': 'Formal Elegance: Professional Style',
                'author': 'Michael Chang',
                'content': '''
                Professional dressing is an art that combines sophistication with comfort. Learn the principles of formal fashion.
                
                Formal Essentials:
                • Tailored fits
                • Quality fabrics
                • Classic colors
                • Polished accessories
                
                Formal style is about projecting confidence and professionalism through well-chosen pieces.
                ''',
                'category': 'Formal',
                'is_trending': True,
                'likes_count': 145,
                'comments_count': 18,
                'views_count': 1100,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754024009/8d2042c922054d05fd4dfc7bd197118b_loopi0.jpg'
                ],
            },
            {
                'title': 'Casual Comfort: Everyday Style',
                'author': 'Sarah Martinez',
                'content': '''
                Casual fashion is about comfort without sacrificing style. Learn how to look put-together in everyday situations.
                
                Casual Style Tips:
                • Comfortable fits
                • Versatile pieces
                • Easy maintenance
                • Personal expression
                
                Casual style celebrates the beauty of simplicity and comfort in daily life.
                ''',
                'category': 'Casual',
                'is_trending': True,
                'likes_count': 178,
                'comments_count': 22,
                'views_count': 1300,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754024065/462431de5eab01e6f00ea6a0c1a31cfc_avzade.jpg'
                ],
            },
        ]

        for blog_data in sample_blogs:
            try:
                blog = Blog.objects.create(
                    title=blog_data['title'],
                    author=blog_data['author'],
                    content=blog_data['content'],
                    category=blog_data['category'],
                    is_trending=blog_data['is_trending'],
                    likes_count=blog_data['likes_count'],
                    comments_count=blog_data['comments_count'],
                    views_count=blog_data['views_count'],
                    images=blog_data.get('images', [])
                )
                self.stdout.write(f'Blog created: {blog.title}')
            except Exception as e:
                self.stdout.write(f'Blog already exists: {blog_data["title"]}')

        self.stdout.write(self.style.SUCCESS('Sample blogs created successfully!')) 