# Flexora Trending Page Database

This document describes the PostgreSQL database setup for the Flexora trending page functionality.

## Overview

The trending page database consists of several interconnected models that support a social media-like platform for fashion content:

- **TrendingPost**: Main content model for fashion posts
- **PostCategory**: Categories for organizing posts (Minimalist, Vintage, etc.)
- **PostLike**: User likes on posts
- **PostComment**: User comments on posts with reply functionality
- **PostView**: Track post views for analytics
- **PostFavorite**: User favorites/bookmarks
- **TrendingAnalytics**: Daily analytics data

## Database Schema

### Core Models

#### TrendingPost
- **id**: UUID primary key
- **title**: Post title (max 255 chars)
- **slug**: URL-friendly slug (auto-generated)
- **author**: Foreign key to User
- **category**: Foreign key to PostCategory
- **content**: Full post content
- **excerpt**: Short description (max 500 chars)
- **featured_image**: Optional featured image
- **image_gradient**: CSS gradient for visual styling
- **likes_count**: Cached likes count
- **comments_count**: Cached comments count
- **views_count**: Cached views count
- **is_trending**: Boolean trending status
- **trending_score**: Calculated engagement score
- **trending_rank**: Position in trending list
- **status**: Draft/Published/Archived
- **tags**: JSON array of tags
- **created_at**: Creation timestamp
- **updated_at**: Last update timestamp
- **published_at**: Publication timestamp

#### PostCategory
- **name**: Category name (max 100 chars)
- **slug**: URL-friendly slug
- **description**: Category description
- **color**: Hex color code for UI
- **is_active**: Active status
- **created_at**: Creation timestamp

#### PostLike
- **post**: Foreign key to TrendingPost
- **user**: Foreign key to User
- **created_at**: Like timestamp

#### PostComment
- **post**: Foreign key to TrendingPost
- **user**: Foreign key to User
- **parent**: Self-referencing for replies
- **content**: Comment text
- **is_approved**: Moderation status
- **created_at**: Comment timestamp
- **updated_at**: Last update timestamp

#### PostView
- **post**: Foreign key to TrendingPost
- **user**: Foreign key to User (optional)
- **ip_address**: Viewer IP address
- **user_agent**: Browser information
- **viewed_at**: View timestamp

#### PostFavorite
- **post**: Foreign key to TrendingPost
- **user**: Foreign key to User
- **created_at**: Favorite timestamp

#### TrendingAnalytics
- **date**: Analytics date
- **total_posts**: Total posts count
- **total_likes**: Total likes count
- **total_comments**: Total comments count
- **total_views**: Total views count
- **trending_posts_count**: Trending posts count
- **created_at**: Creation timestamp

## Setup Instructions

### 1. Prerequisites

- PostgreSQL 12+ installed and running
- Python 3.8+ with pip
- Virtual environment (recommended)

### 2. Install Dependencies

```bash
cd Flexora/backend
pip install -r requirements.txt
```

### 3. Database Setup

#### Option A: Automated Setup (Recommended)

```bash
python setup_database.py
```

This script will:
- Create PostgreSQL database and user
- Generate .env file with database configuration
- Run Django migrations
- Create admin superuser
- Populate sample data

#### Option B: Manual Setup

1. **Create PostgreSQL Database**
```sql
CREATE USER flexora_user WITH PASSWORD 'flexora_password_2024';
CREATE DATABASE flexora_trending_db OWNER flexora_user;
GRANT ALL PRIVILEGES ON DATABASE flexora_trending_db TO flexora_user;
```

2. **Configure Environment**
Create a `.env` file in the backend directory:
```env
DB_NAME=flexora_trending_db
DB_USER=flexora_user
DB_PASSWORD=flexora_password_2024
DB_HOST=localhost
DB_PORT=5432
```

3. **Run Migrations**
```bash
python manage.py migrate
```

4. **Create Superuser**
```bash
python manage.py createsuperuser
```

5. **Populate Sample Data**
```bash
python manage.py populate_trending_posts
```

### 4. Start Development Server

```bash
python manage.py runserver
```

Access the admin panel at: http://localhost:8000/admin

## API Endpoints

### Trending Posts

- `GET /api/trending-posts/` - List all trending posts
- `GET /api/trending-posts/{id}/` - Get specific post
- `POST /api/trending-posts/` - Create new post (authenticated)
- `PUT /api/trending-posts/{id}/` - Update post (author only)
- `DELETE /api/trending-posts/{id}/` - Delete post (author only)

### Post Categories

- `GET /api/post-categories/` - List all categories
- `GET /api/post-categories/{id}/` - Get specific category

### Post Engagement

- `POST /api/trending-posts/{id}/like/` - Like/unlike post
- `POST /api/trending-posts/{id}/favorite/` - Favorite/unfavorite post
- `POST /api/trending-posts/{id}/view/` - Record post view

### Comments

- `GET /api/post-comments/` - List comments
- `POST /api/post-comments/` - Create comment
- `PUT /api/post-comments/{id}/` - Update comment (author only)
- `DELETE /api/post-comments/{id}/` - Delete comment (author only)

### Analytics

- `GET /api/trending-analytics/` - List analytics data
- `GET /api/trending-analytics/summary/` - Get analytics summary

## Query Parameters

### Trending Posts Filtering

- `category_slug`: Filter by category slug
- `trending_only=true`: Show only trending posts
- `time_period`: Filter by time (today, week, month)
- `search`: Search in title, content, excerpt
- `ordering`: Sort by created_at, trending_score, likes_count, views_count

### Examples

```bash
# Get trending posts only
GET /api/trending-posts/?trending_only=true

# Get posts from specific category
GET /api/trending-posts/?category_slug=minimalist

# Get posts from last week
GET /api/trending-posts/?time_period=week

# Search posts
GET /api/trending-posts/?search=parisian

# Sort by trending score
GET /api/trending-posts/?ordering=-trending_score
```

## Trending Algorithm

The trending score is calculated automatically based on engagement:

```python
trending_score = (likes_count * 0.4) + (comments_count * 0.3) + (views_count * 0.3)
```

Posts with a trending score > 100 are automatically marked as trending.

## Admin Interface

The Django admin interface provides comprehensive management for:

- **Trending Posts**: Create, edit, and manage posts
- **Categories**: Manage post categories
- **Comments**: Moderate user comments
- **Analytics**: View engagement statistics
- **Users**: Manage user accounts and profiles

Access: http://localhost:8000/admin

Default credentials:
- Username: admin
- Password: admin123

## Sample Data

The `populate_trending_posts` command creates sample data including:

- 6 post categories (Minimalist, Vintage, Streetwear, Bohemian, Formal, Casual)
- 12 sample trending posts with realistic engagement data
- Sample users for each post author

## Database Indexes

The following indexes are created for optimal performance:

- `trending_score` and `is_trending` for trending queries
- `category` and `created_at` for category filtering
- `status` and `published_at` for published posts
- Unique constraints on user-post combinations for likes, favorites, and views

## Security Features

- JWT authentication for API access
- User permission checks for post modifications
- Comment moderation system
- IP-based view tracking
- CORS configuration for frontend integration

## Performance Considerations

- Database indexes on frequently queried fields
- Cached counts for likes, comments, and views
- Efficient queries with select_related and prefetch_related
- Pagination support for large datasets
- Background task support for analytics calculation

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in .env file
   - Ensure database and user exist

2. **Migration Errors**
   - Delete migration files and recreate: `python manage.py makemigrations`
   - Reset database if needed: `python manage.py flush`

3. **Permission Errors**
   - Check user permissions in PostgreSQL
   - Verify Django user authentication

4. **Import Errors**
   - Install missing dependencies: `pip install -r requirements.txt`
   - Check Python path and virtual environment

### Logs

Check Django logs for detailed error information:
```bash
python manage.py runserver --verbosity=2
```

## Contributing

When adding new features:

1. Create new models in `api/models.py`
2. Add serializers in `api/serializers.py`
3. Create views in `api/views.py`
4. Update URLs in `api/urls.py`
5. Create and run migrations
6. Update admin interface
7. Add tests
8. Update documentation

## License

This database setup is part of the Flexora project and follows the same licensing terms. 