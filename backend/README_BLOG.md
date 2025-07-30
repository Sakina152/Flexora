# Blog Management System

This document describes the blog management system implemented for the Flexora fashion platform.

## Overview

The blog system allows administrators to create, manage, and publish fashion blog posts through the Django admin panel. The system includes comprehensive API endpoints for frontend integration and supports engagement metrics like likes, comments, and views.

## Database Model: Blog

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `title` | CharField(255) | Blog post title |
| `slug` | SlugField(255) | URL-friendly version of title (auto-generated) |
| `author` | CharField(100) | Author name |
| `content` | TextField | Full blog content |
| `excerpt` | TextField(500) | Short summary (auto-generated if not provided) |
| `category` | CharField(20) | Blog category (choices: Minimalist, Vintage, Streetwear, Bohemian, Formal, Casual) |
| `cover_image` | ImageField | Uploaded cover image |
| `cover_image_url` | URLField | Alternative cover image URL |
| `likes_count` | PositiveIntegerField | Number of likes (default: 0) |
| `comments_count` | PositiveIntegerField | Number of comments (default: 0) |
| `views_count` | PositiveIntegerField | Number of views (default: 0) |
| `is_trending` | BooleanField | Mark as trending (default: False) |
| `is_published` | BooleanField | Publication status (default: True) |
| `is_featured` | BooleanField | Mark as featured (default: False) |
| `meta_title` | CharField(60) | SEO title (auto-generated if not provided) |
| `meta_description` | CharField(160) | SEO description (auto-generated if not provided) |
| `tags` | CharField(255) | Comma-separated tags |
| `created_at` | DateTimeField | Creation timestamp (auto) |
| `updated_at` | DateTimeField | Last update timestamp (auto) |
| `published_at` | DateTimeField | Publication timestamp (auto) |

### Auto-Generated Fields

- **Slug**: Automatically generated from title using `slugify()`
- **Excerpt**: First 200 characters of content + "..." if not provided
- **Meta Title**: First 60 characters of title if not provided
- **Meta Description**: First 160 characters of excerpt if not provided
- **Time Ago**: Human-readable time since publication

## Admin Panel Features

### Blog Management Interface

The admin panel provides a comprehensive interface for managing blog posts:

#### List View Features
- **List Display**: Title, Author, Category, Trending Status, Published Status, Featured Status, Likes, Views, Published Date
- **Filters**: Category, Trending Status, Published Status, Featured Status, Created Date, Published Date
- **Search**: Title, Author, Content, Excerpt, Tags
- **Inline Editing**: Trending, Published, and Featured status can be edited directly from the list
- **Bulk Actions**: Mark as trending, Mark as featured, Publish, Unpublish

#### Detail View Features
- **Organized Fieldsets**:
  - Basic Information: Title, Slug, Author, Category, Excerpt
  - Content: Full blog content (wide field)
  - Media: Cover image upload and URL
  - Status & Visibility: Published, Trending, Featured status
  - SEO & Metadata: Meta title, description, tags
  - Engagement Metrics: Likes, comments, views, time ago (read-only)
  - Timestamps: All timestamp fields (collapsed by default)

#### Admin Actions
- **Mark as Trending**: Bulk action to mark selected blogs as trending
- **Mark as Featured**: Bulk action to mark selected blogs as featured
- **Publish Blogs**: Bulk action to publish selected blogs
- **Unpublish Blogs**: Bulk action to unpublish selected blogs

### Creating a New Blog Post

1. Navigate to Django Admin → Blog Posts → Add Blog Post
2. Fill in the required fields:
   - **Title**: The blog post title
   - **Author**: Author name
   - **Content**: Full blog content (supports rich text)
   - **Category**: Select from predefined categories
3. Optional fields:
   - **Excerpt**: Custom excerpt (auto-generated if left blank)
   - **Cover Image**: Upload an image or provide URL
   - **Tags**: Comma-separated tags for categorization
4. Set visibility options:
   - **Published**: Check to make the blog live
   - **Trending**: Check to show in trending section
   - **Featured**: Check to show on homepage
5. Click "Save" to create the blog post

## API Endpoints

### 1. Get All Blogs
```
GET /api/blogs/
```

**Query Parameters:**
- `category`: Filter by category (e.g., `?category=Minimalist`)
- `trending`: Filter trending blogs (e.g., `?trending=true`)
- `featured`: Filter featured blogs (e.g., `?featured=true`)
- `limit`: Limit number of results (e.g., `?limit=10`)

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Blog Title",
    "slug": "blog-title",
    "author": "Author Name",
    "content": "Full content...",
    "excerpt": "Short excerpt...",
    "category": "Minimalist",
    "cover_image": "image_url",
    "cover_image_url": "url",
    "likes_count": 123,
    "comments_count": 45,
    "views_count": 1000,
    "is_trending": true,
    "is_published": true,
    "is_featured": false,
    "meta_title": "SEO Title",
    "meta_description": "SEO Description",
    "tags": "tag1, tag2, tag3",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z",
    "published_at": "2024-01-01T00:00:00Z",
    "time_ago": "2 days ago"
  }
]
```

### 2. Get Blog by Slug
```
GET /api/blogs/{slug}/
```

**Response:** Same as above for a single blog post
**Note:** Automatically increments view count

### 3. Get Blog Categories
```
GET /api/blogs/categories/
```

**Response:**
```json
{
  "categories": ["Minimalist", "Vintage", "Streetwear", "Bohemian", "Formal", "Casual"]
}
```

### 4. Blog Engagement
```
POST /api/blogs/{blog_id}/engagement/
```

**Request Body:**
```json
{
  "action": "like"  // or "comment"
}
```

**Response:**
```json
{
  "message": "Blog liked successfully",
  "likes_count": 124
}
```

## Management Commands

### Populate Sample Blogs
```bash
python manage.py populate_blogs
```

This command creates sample blog posts for testing and development purposes.

## Frontend Integration

The blog system is designed to integrate seamlessly with the existing frontend:

1. **Trending Page**: Uses `is_trending=true` filter to show trending blogs
2. **Category Pages**: Uses `category` filter to show blogs by category
3. **Individual Blog Pages**: Uses slug-based URLs for individual blog posts
4. **Engagement**: Frontend can call engagement endpoints for likes and comments

## File Structure

```
backend/
├── api/
│   ├── models.py          # Blog model definition
│   ├── admin.py           # Admin panel configuration
│   ├── views.py           # API views
│   ├── urls.py            # URL routing
│   └── management/
│       └── commands/
│           └── populate_blogs.py  # Sample data command
├── media/
│   └── blog_covers/       # Uploaded blog cover images
└── README_BLOG.md         # This documentation
```

## Usage Examples

### Creating a Blog via Admin Panel
1. Access Django admin at `/admin/`
2. Navigate to "Blog Posts" section
3. Click "Add Blog Post"
4. Fill in the form and save

### API Usage Examples

**Get all trending blogs:**
```bash
curl "http://localhost:8000/api/blogs/?trending=true"
```

**Get blogs by category:**
```bash
curl "http://localhost:8000/api/blogs/?category=Minimalist"
```

**Like a blog:**
```bash
curl -X POST "http://localhost:8000/api/blogs/{blog_id}/engagement/" \
     -H "Content-Type: application/json" \
     -d '{"action": "like"}'
```

## Notes

- The blog system uses PostgreSQL as the database
- All timestamps are in UTC
- Image uploads are stored in the `media/blog_covers/` directory
- The system automatically generates SEO-friendly URLs from titles
- Engagement metrics are tracked and can be used for analytics
- The admin panel provides comprehensive management tools for content creators 