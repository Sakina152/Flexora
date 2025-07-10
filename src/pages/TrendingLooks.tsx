import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import PageHero from '../components/PageHero';
import { Heart, Eye, MessageCircle, BookmarkPlus, TrendingUp } from 'lucide-react';

const TrendingLooks = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const trendingLooks = [
    {
      id: 1,
      title: "Minimalist Autumn Layers",
      author: "Emma Watson",
      likes: 342,
      comments: 28,
      views: 1520,
      image: "gradient-to-br from-accent to-secondary",
      category: "Minimalist",
      trend: "rising"
    },
    {
      id: 2,
      title: "Bohemian Festival Vibes",
      author: "Luna Martinez",
      likes: 289,
      comments: 34,
      views: 1340,
      image: "gradient-to-br from-primary/30 to-accent",
      category: "Bohemian",
      trend: "hot"
    },
    {
      id: 3,
      title: "Vintage Corporate Chic",
      author: "Alexander Kim",
      likes: 456,
      comments: 42,
      views: 2100,
      image: "gradient-to-br from-secondary to-primary/20",
      category: "Vintage",
      trend: "trending"
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

  const handleFavorite = (postId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(postId)) {
        newFavorites.delete(postId);
      } else {
        newFavorites.add(postId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        {/* <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} /> */}
        
        <main className="flex-1 md:ml-0">
          <PageHero 
            title="Trending Looks" 
            subtitle="Discover the hottest fashion trends and styles from our community"
            backgroundGradient="from-primary/30 via-accent/20 to-secondary/10"
          />
          
          {/* Trending Categories */}
          <section className="py-8 px-6 border-b border-border">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-4 overflow-x-auto pb-2">
                {['All Trends', 'Rising', 'Hot', 'New', 'Most Liked'].map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 bg-card border border-border rounded-full hover:bg-accent transition-colors whitespace-nowrap"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Trending Looks Grid */}
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trendingLooks.map((look, index) => (
                  <article 
                    key={look.id}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative">
                      <div className={`h-64 bg-gradient-to-br ${look.image} flex items-center justify-center hover:scale-105 transition-transform duration-300`}>
                        <Eye className="w-8 h-8 text-primary/60" />
                      </div>
                      
                      {/* Trend Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          look.trend === 'hot' ? 'bg-red-100 text-red-800' :
                          look.trend === 'rising' ? 'bg-green-100 text-green-800' :
                          'bg-primary text-primary-foreground'
                        }`}>
                          <TrendingUp className="w-3 h-3 inline mr-1" />
                          {look.trend}
                        </span>
                      </div>

                      {/* Category */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-background/80 text-foreground text-xs px-2 py-1 rounded">
                          {look.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {look.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        by {look.author}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(look.id)}
                            className={`flex items-center gap-1 transition-colors ${
                              likedPosts.has(look.id) ? 'text-primary' : 'hover:text-primary'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${likedPosts.has(look.id) ? 'fill-current' : ''}`} />
                            <span>{look.likes + (likedPosts.has(look.id) ? 1 : 0)}</span>
                          </button>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{look.comments}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{look.views}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleFavorite(look.id)}
                          className={`transition-colors hover:scale-110 transform ${
                            favorites.has(look.id) ? 'text-primary' : 'hover:text-primary'
                          }`}
                        >
                          <BookmarkPlus className={`w-4 h-4 ${favorites.has(look.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Load More Trending Looks
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TrendingLooks;
