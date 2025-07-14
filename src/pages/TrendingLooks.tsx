import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { Heart, Eye, MessageCircle, BookmarkPlus, TrendingUp, Filter } from 'lucide-react';

const TrendingLooks = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Minimalist', 'Vintage', 'Streetwear', 'Bohemian', 'Formal'];

  const trendingPosts = [
    {
      id: 1,
      title: "Parisian Chic: Effortless Style Guide",
      author: "Amelie Dubois",
      likes: 321,
      comments: 45,
      image: "from-primary/30 to-secondary",
      category: "Chic",
      timeAgo: "2 days ago",
      trending: true,
      link: "/trending/parisian-chic"
    },
    {
      id: 2,
      title: "Sustainable Fashion: Eco-Friendly Brands",
      author: "Lena Green",
      likes: 267,
      comments: 32,
      image: "from-accent to-muted-foreground",
      category: "Eco",
      timeAgo: "3 days ago",
      trending: false,
      link: "/trending/sustainable-fashion"
    },
    {
      id: 3,
      title: "Street Style: Urban Fashion Trends",
      author: "Kenji Tanaka",
      likes: 456,
      comments: 67,
      image: "from-secondary to-background",
      category: "Street",
      timeAgo: "4 days ago",
      trending: true,
      link: "/trending/street-style"
    },
    {
      id: 4,
      title: "Bohemian Vibes: Free-Spirited Fashion",
      author: "Maya Silva",
      likes: 298,
      comments: 23,
      image: "from-background to-primary/30",
      category: "Boho",
      timeAgo: "5 days ago",
      trending: false,
      link: "/trending/bohemian-vibes"
    },
    {
      id: 5,
      title: "Vintage Revival: Retro Fashion Inspirations",
      author: "Clara Rossi",
      likes: 387,
      comments: 54,
      image: "from-muted-foreground to-accent",
      category: "Vintage",
      timeAgo: "6 days ago",
      trending: true,
      link: "/trending/vintage-revivalT"
    },
    {
      id: 6,
      title: "Minimalist Wardrobe: Capsule Collection",
      author: "Ethan White",
      likes: 245,
      comments: 12,
      image: "from-secondary to-muted-foreground",
      category: "Minimal",
      timeAgo: "1 week ago",
      trending: false,
      link: "#"
    }
  ];

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const handleFavorite = (post: any) => {
    const savedFavorites = JSON.parse(localStorage.getItem('flexora-favorites') || '[]');
    const isAlreadyFavorite = savedFavorites.some((fav: any) => fav.id === post.id);
    
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...savedFavorites, post];
      localStorage.setItem('flexora-favorites', JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="w-full">
        <PageHero 
          title="Trending Looks"
          subtitle="Discover the hottest fashion trends and styles from our community"
          backgroundGradient="from-accent/30 to-secondary/20"
        />

        {/* Filters */}
        <section className="py-8 px-6 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Posts Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl font-bold text-foreground">
                What's Trending Now
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingPosts.map((post, index) => (
                <Link 
                  key={post.id}
                  to={post.link}
                  className="block"
                >
                  <article 
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`relative h-64 bg-gradient-to-br ${post.image} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                      <Eye className="w-8 h-8 text-primary/60" />
                      {post.trending && (
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Hot
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {post.timeAgo}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        by {post.author}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleLike(post.id);
                            }}
                            className={`flex items-center gap-1 transition-colors ${
                              likedPosts.has(post.id) ? 'text-primary' : 'hover:text-primary'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                            <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                          </button>
                          <div className="flex items-center gap-1 hover:text-primary transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            handleFavorite(post);
                          }}
                          className="transition-colors hover:scale-110 transform hover:text-primary"
                        >
                          <BookmarkPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TrendingLooks;
