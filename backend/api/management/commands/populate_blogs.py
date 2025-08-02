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
                'author': 'Isabelle Dubois',
                'content': '''
                Discover the secrets of Parisian style - where elegance meets effortlessness. Parisian women have mastered the art of looking polished without trying too hard.
                
                Parisian Style Principles:
                • Quality over quantity
                • Neutral color palette with pops of color
                • Perfect fit and tailoring
                • Minimal accessories with maximum impact
                • Confidence as the ultimate accessory
                
                The key to Parisian chic is understanding that less is more, and that true style comes from within.
                ''',
                'category': 'Minimalist',
                'is_trending': True,
                'likes_count': 342,
                'comments_count': 45,
                'views_count': 2100,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023681/ed6992640292b1390dacd70bd14eb883_eomvq3.jpg'
                ],
            },
            {
                'title': 'Sustainable Fashion: Eco-Friendly Brands',
                'author': 'Eco Fashionista',
                'content': '''
                The fashion industry is evolving towards sustainability. Discover brands that prioritize environmental responsibility without compromising on style.
                
                Sustainable Fashion Principles:
                • Ethical manufacturing processes
                • Eco-friendly materials
                • Fair labor practices
                • Circular fashion economy
                • Reduced carbon footprint
                
                Making conscious fashion choices is not just a trend - it's a lifestyle that benefits our planet.
                ''',
                'category': 'Casual',
                'is_trending': True,
                'likes_count': 289,
                'comments_count': 67,
                'views_count': 1850,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754024207/e232f46b97412f967b1229acf553e24a_gwap12.jpg'
                ],
            },
            {
                'title': 'Street Style: Urban Fashion Trends',
                'author': 'Urban Trendsetter',
                'content': '''
                Street style is the heartbeat of urban fashion. From New York to Tokyo, street style captures the essence of city life through fashion.
                
                Urban Fashion Elements:
                • Mix of high and low fashion
                • Bold color combinations
                • Statement accessories
                • Comfortable yet stylish footwear
                • Individualistic expression
                
                Street style celebrates diversity and personal expression in the urban landscape.
                ''',
                'category': 'Streetwear',
                'is_trending': True,
                'likes_count': 456,
                'comments_count': 89,
                'views_count': 3200,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023828/be2838c5be147c154656b2a6759c5cbb_uasjgn.jpg'
                ],
            },
            {
                'title': 'Bohemian Vibes: Free-Spirited Fashion',
                'author': 'Free Spirit',
                'content': '''
                Bohemian fashion embodies freedom, creativity, and artistic expression. Learn how to channel your inner bohemian spirit through style.
                
                Boho Style Elements:
                • Flowing maxi dresses
                • Fringe and tassel details
                • Natural materials and textures
                • Layered jewelry and accessories
                • Earthy color palettes
                
                Bohemian style is about embracing your authentic self and expressing creativity through fashion.
                ''',
                'category': 'Bohemian',
                'is_trending': True,
                'likes_count': 378,
                'comments_count': 52,
                'views_count': 2400,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023898/d89c9c96b2e3cd6fed259664e60527e3_jpsdyt.jpg'
                ],
            },
            {
                'title': 'Vintage Revival: Retro Fashion Inspirations',
                'author': 'Retro Enthusiast',
                'content': '''
                Vintage fashion continues to inspire modern style. Discover how to incorporate retro elements into your contemporary wardrobe.
                
                Vintage Revival Trends:
                • 70s-inspired silhouettes
                • Retro prints and patterns
                • Classic denim styles
                • Vintage accessories
                • Timeless color combinations
                
                Vintage fashion teaches us that great style is timeless and transcends generations.
                ''',
                'category': 'Vintage',
                'is_trending': True,
                'likes_count': 298,
                'comments_count': 41,
                'views_count': 1950,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023754/1458452e3a59cfcd7de95a391dbf8f3c_wu9tob.jpg'
                ],
            },
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
                'title': 'Minimalist Essentials: Clean Lines & Calm Colors',
                'author': 'Minimalist Muse',
                'content': '''
                Minimalist fashion focuses on clean lines, calm colors, and intentional design. Learn how to create a wardrobe that speaks volumes through simplicity.
                
                Minimalist Essentials:
                • Clean, structured silhouettes
                • Monochromatic color schemes
                • High-quality fabrics
                • Thoughtful design details
                • Functional beauty
                
                Minimalism in fashion is about finding beauty in simplicity and purpose in every piece.
                ''',
                'category': 'Minimalist',
                'is_trending': True,
                'likes_count': 234,
                'comments_count': 28,
                'views_count': 1650,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023681/ed6992640292b1390dacd70bd14eb883_eomvq3.jpg'
                ],
            },
            {
                'title': 'Vintage Glam: Old Hollywood Revival',
                'author': 'Hollywood Dreamer',
                'content': '''
                Old Hollywood glamour continues to inspire modern fashion. Discover how to channel the elegance and sophistication of classic film stars.
                
                Hollywood Glam Elements:
                • Sophisticated silhouettes
                • Luxurious fabrics
                • Statement accessories
                • Red carpet-worthy details
                • Timeless elegance
                
                Old Hollywood style reminds us that true glamour is eternal and transcends time.
                ''',
                'category': 'Vintage',
                'is_trending': True,
                'likes_count': 412,
                'comments_count': 73,
                'views_count': 2800,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023754/1458452e3a59cfcd7de95a391dbf8f3c_wu9tob.jpg'
                ],
            },
            {
                'title': 'Streetwear Icons: Urban Edge',
                'author': 'Urban Icon',
                'content': '''
                Streetwear has become a global phenomenon, influencing high fashion and everyday style. Explore the icons and trends that define urban fashion.
                
                Streetwear Iconic Elements:
                • Bold graphic designs
                • Oversized silhouettes
                • Athletic influences
                • Cultural references
                • Individualistic expression
                
                Streetwear represents the voice of youth culture and urban identity through fashion.
                ''',
                'category': 'Streetwear',
                'is_trending': True,
                'likes_count': 567,
                'comments_count': 95,
                'views_count': 3800,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023828/be2838c5be147c154656b2a6759c5cbb_uasjgn.jpg'
                ],
            },
            {
                'title': 'Bohemian Dream: Festival Ready',
                'author': 'Festival Fashionista',
                'content': '''
                Festival fashion combines bohemian aesthetics with practical comfort. Learn how to create stunning festival looks that are both stylish and functional.
                
                Festival Fashion Essentials:
                • Comfortable yet stylish footwear
                • Weather-appropriate layers
                • Statement accessories
                • Practical bags and storage
                • Creative self-expression
                
                Festival fashion is about celebrating music, art, and community through personal style.
                ''',
                'category': 'Bohemian',
                'is_trending': True,
                'likes_count': 445,
                'comments_count': 78,
                'views_count': 3100,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023898/d89c9c96b2e3cd6fed259664e60527e3_jpsdyt.jpg'
                ],
            },
            {
                'title': 'Formal Affair: Evening Elegance',
                'author': 'Elegance Expert',
                'content': '''
                Evening wear requires a special kind of elegance. Discover how to choose and style formal attire for special occasions.
                
                Evening Elegance Elements:
                • Sophisticated silhouettes
                • Luxurious fabrics
                • Perfect fit and tailoring
                • Complementary accessories
                • Confidence and poise
                
                Evening elegance is about feeling beautiful and confident in your own skin.
                ''',
                'category': 'Formal',
                'is_trending': True,
                'likes_count': 334,
                'comments_count': 56,
                'views_count': 2200,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754024009/8d2042c922054d05fd4dfc7bd197118b_loopi0.jpg'
                ],
            },
            {
                'title': 'Minimalist Layers: Winter Whites',
                'author': 'Winter Minimalist',
                'content': '''
                Winter fashion doesn't have to be dark and heavy. Discover how to create beautiful layered looks using winter whites and minimalist principles.
                
                Winter Minimalist Style:
                • Layered textures and fabrics
                • Monochromatic white ensembles
                • Quality over quantity
                • Functional warmth
                • Clean, structured silhouettes
                
                Winter whites create a fresh, modern look that brightens the darkest days.
                ''',
                'category': 'Minimalist',
                'is_trending': True,
                'likes_count': 267,
                'comments_count': 39,
                'views_count': 1750,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023681/ed6992640292b1390dacd70bd14eb883_eomvq3.jpg'
                ],
            },
            {
                'title': 'Minimalist Summer: Linen Staples',
                'author': 'Summer Minimalist',
                'content': '''
                Summer minimalism celebrates natural fabrics and effortless style. Learn how to build a summer wardrobe around linen and other breathable materials.
                
                Summer Minimalist Essentials:
                • Natural linen fabrics
                • Light, breathable materials
                • Neutral summer colors
                • Simple, elegant silhouettes
                • Comfortable, practical design
                
                Summer minimalism is about staying cool, comfortable, and stylish in the heat.
                ''',
                'category': 'Minimalist',
                'is_trending': True,
                'likes_count': 198,
                'comments_count': 31,
                'views_count': 1450,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023681/ed6992640292b1390dacd70bd14eb883_eomvq3.jpg'
                ],
            },
            {
                'title': 'Vintage Denim: 90s Throwback',
                'author': 'Denim Lover',
                'content': '''
                The 90s denim revival is stronger than ever. Discover how to incorporate vintage denim styles into your modern wardrobe.
                
                90s Denim Trends:
                • High-waisted mom jeans
                • Oversized denim jackets
                • Distressed and vintage washes
                • Denim-on-denim looks
                • Retro denim accessories
                
                90s denim represents an era of effortless cool and timeless style.
                ''',
                'category': 'Vintage',
                'is_trending': True,
                'likes_count': 389,
                'comments_count': 62,
                'views_count': 2600,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023754/1458452e3a59cfcd7de95a391dbf8f3c_wu9tob.jpg'
                ],
            },
            {
                'title': 'Retro Prints: Colorful Comeback',
                'author': 'Print Enthusiast',
                'content': '''
                Retro prints are making a colorful comeback in modern fashion. Learn how to incorporate vintage-inspired patterns into your contemporary style.
                
                Retro Print Trends:
                • Psychedelic patterns
                • Geometric designs
                • Floral motifs
                • Bold color combinations
                • Vintage-inspired graphics
                
                Retro prints add personality and vibrancy to any wardrobe.
                ''',
                'category': 'Vintage',
                'is_trending': True,
                'likes_count': 312,
                'comments_count': 48,
                'views_count': 2100,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023754/1458452e3a59cfcd7de95a391dbf8f3c_wu9tob.jpg'
                ],
            },
            {
                'title': 'Streetwear Staples: Graphic Tees',
                'author': 'Graphic Designer',
                'content': '''
                Graphic tees are the foundation of streetwear culture. Discover how to style and collect meaningful graphic t-shirts that tell your story.
                
                Graphic Tee Essentials:
                • Meaningful designs and messages
                • Quality cotton fabrics
                • Perfect fit and comfort
                • Versatile styling options
                • Cultural and artistic significance
                
                Graphic tees are wearable art that expresses personality and cultural connection.
                ''',
                'category': 'Streetwear',
                'is_trending': True,
                'likes_count': 478,
                'comments_count': 84,
                'views_count': 3200,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023828/be2838c5be147c154656b2a6759c5cbb_uasjgn.jpg'
                ],
            },
            {
                'title': 'Sneaker Culture: Hottest Drops',
                'author': 'Sneakerhead',
                'content': '''
                Sneaker culture has evolved into a global phenomenon. Stay updated on the hottest drops and learn how to style sneakers with any outfit.
                
                Sneaker Culture Elements:
                • Limited edition releases
                • Collaborations and exclusives
                • Cultural significance
                • Investment value
                • Community and connection
                
                Sneakers are more than footwear - they're cultural artifacts and personal statements.
                ''',
                'category': 'Streetwear',
                'is_trending': True,
                'likes_count': 623,
                'comments_count': 112,
                'views_count': 4500,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023828/be2838c5be147c154656b2a6759c5cbb_uasjgn.jpg'
                ],
            },
            {
                'title': 'Boho Maxi Dresses: Summer Breeze',
                'author': 'Summer Boho',
                'content': '''
                Boho maxi dresses embody the free-spirited summer aesthetic. Learn how to style these flowing beauties for any summer occasion.
                
                Boho Maxi Dress Styling:
                • Flowing, comfortable fabrics
                • Natural, earthy colors
                • Layered accessories
                • Comfortable footwear
                • Effortless, romantic vibes
                
                Boho maxi dresses capture the essence of summer freedom and feminine beauty.
                ''',
                'category': 'Bohemian',
                'is_trending': True,
                'likes_count': 356,
                'comments_count': 59,
                'views_count': 2400,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023898/d89c9c96b2e3cd6fed259664e60527e3_jpsdyt.jpg'
                ],
            },
            {
                'title': 'Layered Jewelry: Boho Accessories',
                'author': 'Jewelry Artist',
                'content': '''
                Layered jewelry is the perfect finishing touch for bohemian style. Learn how to create beautiful layered looks with meaningful accessories.
                
                Boho Jewelry Layering:
                • Mix of metals and materials
                • Meaningful charms and symbols
                • Varied lengths and textures
                • Personal significance
                • Artistic expression
                
                Layered jewelry tells your story and adds personality to any outfit.
                ''',
                'category': 'Bohemian',
                'is_trending': True,
                'likes_count': 289,
                'comments_count': 47,
                'views_count': 1950,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754023898/d89c9c96b2e3cd6fed259664e60527e3_jpsdyt.jpg'
                ],
            },
            {
                'title': 'Black Tie: Classic Tuxedos',
                'author': 'Formal Expert',
                'content': '''
                The classic tuxedo represents the pinnacle of formal elegance. Discover how to choose and style the perfect tuxedo for black tie events.
                
                Tuxedo Essentials:
                • Perfect fit and tailoring
                • Quality wool fabrics
                • Classic black or midnight blue
                • Proper accessories and details
                • Confidence and sophistication
                
                A well-fitted tuxedo is the ultimate expression of masculine elegance.
                ''',
                'category': 'Formal',
                'is_trending': True,
                'likes_count': 445,
                'comments_count': 76,
                'views_count': 2900,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754024009/8d2042c922054d05fd4dfc7bd197118b_loopi0.jpg'
                ],
            },
            {
                'title': 'Evening Gowns: Red Carpet Ready',
                'author': 'Red Carpet Stylist',
                'content': '''
                Evening gowns are the epitome of glamour and sophistication. Learn how to choose and style the perfect gown for special occasions.
                
                Evening Gown Selection:
                • Flattering silhouette for your body type
                • Luxurious fabrics and details
                • Perfect fit and alterations
                • Complementary accessories
                • Confidence and grace
                
                An evening gown should make you feel like the most beautiful version of yourself.
                ''',
                'category': 'Formal',
                'is_trending': True,
                'likes_count': 523,
                'comments_count': 89,
                'views_count': 3600,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754024009/8d2042c922054d05fd4dfc7bd197118b_loopi0.jpg'
                ],
            },
            {
                'title': 'Effortless Summer: Casual Staples',
                'author': 'Summer Stylist',
                'content': '''
                Summer casual fashion is all about comfort and style. Discover the essential pieces that make summer dressing effortless and chic.
                
                Summer Casual Essentials:
                • Light, breathable fabrics
                • Comfortable, stylish footwear
                • Versatile, mix-and-match pieces
                • Sun protection accessories
                • Easy-care, low-maintenance items
                
                Summer casual style celebrates the joy of warm weather and relaxed living.
                ''',
                'category': 'Casual',
                'is_trending': True,
                'likes_count': 234,
                'comments_count': 38,
                'views_count': 1650,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754024065/462431de5eab01e6f00ea6a0c1a31cfc_avzade.jpg'
                ],
            },
            {
                'title': 'Weekend Comfort: Relaxed Denim & Tees',
                'author': 'Weekend Warrior',
                'content': '''
                Weekend fashion prioritizes comfort without sacrificing style. Learn how to create relaxed, comfortable looks for your days off.
                
                Weekend Style Essentials:
                • Comfortable denim in various washes
                • Soft, breathable t-shirts
                • Relaxed silhouettes
                • Easy-care fabrics
                • Versatile layering pieces
                
                Weekend style is about feeling comfortable and confident in your own skin.
                ''',
                'category': 'Casual',
                'is_trending': True,
                'likes_count': 198,
                'comments_count': 32,
                'views_count': 1400,
                'images': [
                    'https://res.cloudinary.com/dlpuuekkl/image/upload/v1754024065/462431de5eab01e6f00ea6a0c1a31cfc_avzade.jpg'
                ],
            },
            {
                'title': 'Casual Chic: Everyday Essentials',
                'author': 'Everyday Stylist',
                'content': '''
                Casual chic combines comfort with sophistication for everyday wear. Discover how to look polished and put-together in casual situations.
                
                Casual Chic Elements:
                • Elevated basics
                • Thoughtful accessories
                • Perfect fit and tailoring
                • Quality fabrics
                • Effortless sophistication
                
                Casual chic proves that you can be comfortable and stylish at the same time.
                ''',
                'category': 'Casual',
                'is_trending': True,
                'likes_count': 267,
                'comments_count': 44,
                'views_count': 1850,
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