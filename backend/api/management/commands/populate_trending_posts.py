from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
import random

from api.models import PostCategory, TrendingPost


class Command(BaseCommand):
    help = 'Populate the database with sample trending posts data'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample trending posts data...')
        
        # Create categories if they don't exist
        categories_data = [
            {'name': 'Minimalist', 'slug': 'minimalist', 'color': '#3B82F6'},
            {'name': 'Vintage', 'slug': 'vintage', 'color': '#8B5CF6'},
            {'name': 'Streetwear', 'slug': 'streetwear', 'color': '#EF4444'},
            {'name': 'Bohemian', 'slug': 'bohemian', 'color': '#10B981'},
            {'name': 'Formal', 'slug': 'formal', 'color': '#6B7280'},
            {'name': 'Casual', 'slug': 'casual', 'color': '#F59E0B'},
        ]
        
        categories = {}
        for cat_data in categories_data:
            category, created = PostCategory.objects.get_or_create(
                slug=cat_data['slug'],
                defaults=cat_data
            )
            categories[cat_data['name']] = category
            if created:
                self.stdout.write(f'Created category: {category.name}')
        
        # Get or create a sample user
        user, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@flexora.com',
                'first_name': 'Admin',
                'last_name': 'User',
                'is_staff': True,
                'is_superuser': True
            }
        )
        if created:
            user.set_password('admin123')
            user.save()
            self.stdout.write('Created admin user')
        
        # Sample trending posts data
        trending_posts_data = [
            {
                'title': 'Parisian Chic: Effortless Style Guide',
                'author': 'Amelie Dubois',
                'category': 'Minimalist',
                'content': 'Discover the secrets of Parisian style with this comprehensive guide to effortless elegance.',
                'excerpt': 'Master the art of Parisian chic with timeless pieces and sophisticated styling.',
                'likes_count': 321,
                'comments_count': 45,
                'image_gradient': 'from-primary/30 to-secondary',
                'is_trending': True,
                'trending_score': 150.5,
                'tags': ['parisian', 'chic', 'elegance', 'style-guide']
            },
            {
                'title': 'Sustainable Fashion: Eco-Friendly Brands',
                'author': 'Lena Green',
                'category': 'Vintage',
                'content': 'Explore the best eco-friendly fashion brands that are making a difference.',
                'excerpt': 'Support sustainable fashion with these amazing eco-friendly brands.',
                'likes_count': 267,
                'comments_count': 32,
                'image_gradient': 'from-accent to-muted-foreground',
                'is_trending': False,
                'trending_score': 95.2,
                'tags': ['sustainable', 'eco-friendly', 'brands', 'fashion']
            },
            {
                'title': 'Street Style: Urban Fashion Trends',
                'author': 'Kenji Tanaka',
                'category': 'Streetwear',
                'content': 'The latest urban fashion trends that are taking the streets by storm.',
                'excerpt': 'Stay ahead of the curve with these cutting-edge street style trends.',
                'likes_count': 456,
                'comments_count': 67,
                'image_gradient': 'from-secondary to-background',
                'is_trending': True,
                'trending_score': 180.3,
                'tags': ['street-style', 'urban', 'trends', 'fashion']
            },
            {
                'title': 'Bohemian Vibes: Free-Spirited Fashion',
                'author': 'Maya Silva',
                'category': 'Bohemian',
                'content': 'Embrace your free spirit with these bohemian fashion inspirations.',
                'excerpt': 'Channel your inner bohemian with these free-spirited fashion choices.',
                'likes_count': 298,
                'comments_count': 23,
                'image_gradient': 'from-background to-primary/30',
                'is_trending': False,
                'trending_score': 110.7,
                'tags': ['bohemian', 'free-spirited', 'boho', 'fashion']
            },
            {
                'title': 'Vintage Revival: Retro Fashion Inspirations',
                'author': 'Clara Rossi',
                'category': 'Vintage',
                'content': 'Bring back the glamour of past decades with these vintage fashion inspirations.',
                'excerpt': 'Rediscover the beauty of vintage fashion with these retro inspirations.',
                'likes_count': 387,
                'comments_count': 54,
                'image_gradient': 'from-muted-foreground to-accent',
                'is_trending': True,
                'trending_score': 165.8,
                'tags': ['vintage', 'retro', 'glamour', 'fashion']
            },
            {
                'title': 'Minimalist Wardrobe: Capsule Collection',
                'author': 'Ethan White',
                'category': 'Minimalist',
                'content': 'Build the perfect minimalist wardrobe with this essential capsule collection.',
                'excerpt': 'Simplify your style with this curated minimalist capsule collection.',
                'likes_count': 245,
                'comments_count': 12,
                'image_gradient': 'from-secondary to-muted-foreground',
                'is_trending': False,
                'trending_score': 85.4,
                'tags': ['minimalist', 'capsule', 'wardrobe', 'essentials']
            },
            {
                'title': 'Minimalist Essentials: Clean Lines & Calm Colors',
                'author': 'Sophia Lin',
                'category': 'Minimalist',
                'content': 'Master the art of minimalist dressing with clean lines and calming colors.',
                'excerpt': 'Achieve effortless style with clean lines and calming color palettes.',
                'likes_count': 210,
                'comments_count': 15,
                'image_gradient': 'from-primary/20 to-accent/20',
                'is_trending': False,
                'trending_score': 75.5,
                'tags': ['minimalist', 'clean-lines', 'calm-colors', 'style']
            },
            {
                'title': 'Vintage Glam: Old Hollywood Revival',
                'author': 'Grace Kelly',
                'category': 'Vintage',
                'content': 'Channel the glamour of Old Hollywood with these vintage-inspired looks.',
                'excerpt': 'Bring back the golden age of Hollywood with these glamorous vintage looks.',
                'likes_count': 330,
                'comments_count': 28,
                'image_gradient': 'from-secondary/20 to-primary/30',
                'is_trending': True,
                'trending_score': 140.2,
                'tags': ['vintage', 'hollywood', 'glamour', 'golden-age']
            },
            {
                'title': 'Streetwear Icons: Urban Edge',
                'author': 'Jayden Park',
                'category': 'Streetwear',
                'content': 'Discover the iconic streetwear pieces that define urban fashion.',
                'excerpt': 'Get the urban edge with these iconic streetwear pieces.',
                'likes_count': 180,
                'comments_count': 10,
                'image_gradient': 'from-accent/30 to-primary/20',
                'is_trending': False,
                'trending_score': 65.0,
                'tags': ['streetwear', 'urban', 'icons', 'fashion']
            },
            {
                'title': 'Bohemian Dream: Festival Ready',
                'author': 'Lila Rose',
                'category': 'Bohemian',
                'content': 'Get festival-ready with these bohemian dream outfits and accessories.',
                'excerpt': 'Perfect your festival look with these bohemian dream ensembles.',
                'likes_count': 275,
                'comments_count': 19,
                'image_gradient': 'from-accent/20 to-secondary/30',
                'is_trending': False,
                'trending_score': 100.8,
                'tags': ['bohemian', 'festival', 'dream', 'outfits']
            },
            {
                'title': 'Formal Affair: Evening Elegance',
                'author': 'Oliver Stone',
                'category': 'Formal',
                'content': 'Master the art of evening elegance with these formal fashion tips.',
                'excerpt': 'Achieve perfect evening elegance with these formal fashion essentials.',
                'likes_count': 195,
                'comments_count': 8,
                'image_gradient': 'from-primary/20 to-secondary/30',
                'is_trending': False,
                'trending_score': 70.1,
                'tags': ['formal', 'evening', 'elegance', 'fashion']
            },
            {
                'title': 'Effortless Summer: Casual Staples',
                'author': 'Emma Chen',
                'category': 'Casual',
                'content': 'Build your perfect summer wardrobe with these casual staples.',
                'excerpt': 'Stay cool and stylish with these essential summer casual pieces.',
                'likes_count': 175,
                'comments_count': 14,
                'image_gradient': 'from-primary/30 to-accent/20',
                'is_trending': True,
                'trending_score': 80.5,
                'tags': ['summer', 'casual', 'staples', 'wardrobe']
            }
        ]
        
        # Create trending posts
        created_count = 0
        for post_data in trending_posts_data:
            # Create a user for the author if it doesn't exist
            author_username = post_data['author'].replace(' ', '').lower()
            author, created = User.objects.get_or_create(
                username=author_username,
                defaults={
                    'first_name': post_data['author'].split()[0],
                    'last_name': ' '.join(post_data['author'].split()[1:]) if len(post_data['author'].split()) > 1 else '',
                    'email': f'{author_username}@flexora.com'
                }
            )
            
            # Set random creation date within the last 30 days
            days_ago = random.randint(1, 30)
            created_at = timezone.now() - timedelta(days=days_ago)
            
            post, created = TrendingPost.objects.get_or_create(
                title=post_data['title'],
                defaults={
                    'author': author,
                    'category': categories[post_data['category']],
                    'content': post_data['content'],
                    'excerpt': post_data['excerpt'],
                    'likes_count': post_data['likes_count'],
                    'comments_count': post_data['comments_count'],
                    'image_gradient': post_data['image_gradient'],
                    'is_trending': post_data['is_trending'],
                    'trending_score': post_data['trending_score'],
                    'tags': post_data['tags'],
                    'status': 'published',
                    'created_at': created_at,
                    'published_at': created_at
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(f'Created post: {post.title}')
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created {created_count} trending posts!'
            )
        ) 