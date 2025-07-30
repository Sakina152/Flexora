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
                'title': 'Parisian Chic: Effortless Style Guide',
                'author': 'Amelie Dubois',
                'content': '''
                Parisian chic is not about following trends—it's about creating a timeless wardrobe that exudes confidence and sophistication. 
                The key is to invest in quality basics and learn the art of effortless styling.
                
                Key Elements:
                • Well-fitted blazers in neutral tones
                • Classic trench coats
                • High-quality silk scarves
                • Perfectly tailored trousers
                • Simple, elegant accessories
                
                The essence of Parisian style lies in the perfect balance between classic and contemporary. 
                French women have mastered the art of looking put-together without appearing overdone. 
                They understand that true elegance comes from confidence and comfort in one's own skin.
                ''',
                'category': 'Minimalist',
                'is_trending': True,
                'likes_count': 321,
                'comments_count': 45,
                'views_count': 1200,
            },
            {
                'title': 'Sustainable Fashion: Eco-Friendly Brands',
                'author': 'Lena Green',
                'content': '''
                As awareness about environmental impact grows, sustainable fashion has become more than just a trend—it's a movement. 
                Consumers are increasingly demanding transparency and ethical practices from their favorite brands.
                
                Top Sustainable Practices:
                • Use of organic and recycled materials
                • Fair labor practices and living wages
                • Reduced water and energy consumption
                • Circular fashion initiatives
                • Transparent supply chains
                
                The future of fashion lies in sustainability. Brands that embrace eco-friendly practices 
                are not only helping the planet but also building stronger relationships with conscious consumers.
                ''',
                'category': 'Vintage',
                'is_trending': False,
                'likes_count': 267,
                'comments_count': 32,
                'views_count': 890,
            },
            {
                'title': 'Street Style: Urban Fashion Trends',
                'author': 'Kenji Tanaka',
                'content': '''
                Street style has evolved from underground subcultures to mainstream fashion influence. 
                Urban fashion is all about self-expression, comfort, and cultural fusion.
                
                Current Street Style Trends:
                • Oversized silhouettes and layering
                • Bold graphics and statement pieces
                • Mix of high-end and streetwear brands
                • Gender-fluid fashion choices
                • Sustainable streetwear options
                
                Street style continues to push boundaries and challenge traditional fashion norms, 
                making it one of the most dynamic and influential fashion movements today.
                ''',
                'category': 'Streetwear',
                'is_trending': True,
                'likes_count': 456,
                'comments_count': 67,
                'views_count': 1500,
            },
            {
                'title': 'Bohemian Vibes: Free-Spirited Fashion',
                'author': 'Maya Silva',
                'content': '''
                Bohemian fashion celebrates freedom, creativity, and a connection to nature. 
                It's about embracing individuality and creating a style that reflects your inner spirit.
                
                Boho Style Elements:
                • Flowing maxi dresses and skirts
                • Natural fabrics like cotton, linen, and silk
                • Layered jewelry and accessories
                • Earthy color palettes
                • Handcrafted and vintage pieces
                
                Bohemian style is more than just fashion—it's a lifestyle that embraces creativity, 
                freedom, and a deep appreciation for art and culture.
                ''',
                'category': 'Bohemian',
                'is_trending': False,
                'likes_count': 298,
                'comments_count': 23,
                'views_count': 750,
            },
            {
                'title': 'Vintage Revival: Retro Fashion Inspirations',
                'author': 'Clara Rossi',
                'content': '''
                Vintage fashion has made a powerful comeback, bringing with it the elegance and charm of bygone eras. 
                From 1920s flapper dresses to 1980s power suits, retro styles continue to inspire modern fashion.
                
                Popular Vintage Eras:
                • 1920s: Art Deco elegance and flapper style
                • 1950s: Feminine silhouettes and classic glamour
                • 1970s: Bohemian freedom and disco glam
                • 1980s: Bold colors and power dressing
                • 1990s: Minimalist grunge and street style
                
                Vintage fashion allows us to connect with history while creating unique, 
                sustainable style choices that stand out in today's fast-fashion world.
                ''',
                'category': 'Vintage',
                'is_trending': True,
                'likes_count': 387,
                'comments_count': 54,
                'views_count': 1100,
            },
            {
                'title': 'Minimalist Wardrobe: Capsule Collection',
                'author': 'Ethan White',
                'content': '''
                Minimalism in fashion is about quality over quantity, creating a curated wardrobe 
                that serves your lifestyle and reflects your personal style.
                
                Capsule Wardrobe Essentials:
                • 10-15 versatile tops
                • 5-7 bottoms (pants, skirts, shorts)
                • 3-5 dresses for various occasions
                • 2-3 outerwear pieces
                • 5-7 pairs of shoes
                • Quality accessories
                
                A minimalist wardrobe reduces decision fatigue, saves money, and helps create 
                a more sustainable approach to fashion consumption.
                ''',
                'category': 'Minimalist',
                'is_trending': False,
                'likes_count': 245,
                'comments_count': 12,
                'views_count': 680,
            },
        ]
        
        created_count = 0
        for blog_data in sample_blogs:
            # Check if blog already exists
            if not Blog.objects.filter(title=blog_data['title']).exists():
                blog = Blog.objects.create(
                    title=blog_data['title'],
                    author=blog_data['author'],
                    content=blog_data['content'],
                    category=blog_data['category'],
                    is_trending=blog_data['is_trending'],
                    likes_count=blog_data['likes_count'],
                    comments_count=blog_data['comments_count'],
                    views_count=blog_data['views_count'],
                    is_published=True,
                )
                created_count += 1
                self.stdout.write(f'Created blog: {blog.title}')
            else:
                self.stdout.write(f'Blog already exists: {blog_data["title"]}')
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {created_count} blog posts!')
        ) 