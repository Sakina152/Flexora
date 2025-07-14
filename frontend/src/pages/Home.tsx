
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import StyleQuiz from '../components/StyleQuiz';
import { Sparkles, TrendingUp, Users, Heart, Eye, MessageCircle, BookmarkPlus } from 'lucide-react';

const Home = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Discover Your Style",
      description: "Take our personalized quiz to find your unique fashion aesthetic"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Latest Trends",
      description: "Stay ahead with the newest fashion trends and style inspirations"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Student Community",
      description: "Connect with fellow fashion enthusiasts and share your creativity"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Curated Collections",
      description: "Explore handpicked fashion collections from talented designers"
    }
  ];

  const trendingPosts = [
    {
      id: 1,
      title: "Minimalist Summer Wardrobe Essentials",
      author: "Emma Chen",
      likes: 234,
      comments: 18,
      image: "from-accent to-secondary"
    },
    {
      id: 2,
      title: "Sustainable Fashion: Making Conscious Choices",
      author: "Alex Rivera",
      likes: 187,
      comments: 23,
      image: "from-primary/30 to-accent"
    },
    {
      id: 3,
      title: "Mixing Vintage with Modern: A Style Guide",
      author: "Sophie Laurent",
      likes: 298,
      comments: 31,
      image: "from-secondary to-primary/20"
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
        <Hero />
        
        {/* Features Section */}
        <section className="py-16 px-6 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Flex Your Aura
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover, create, and share your unique fashion story with our vibrant community
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Posts Section */}
        <section className="py-16 px-6 bg-card/50 animate-slide-in-right">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Trending This Week
              </h2>
              <a href="/trending-looks" className="text-primary hover:text-primary/80 font-medium transition-colors">
                View All
              </a>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {trendingPosts.map((post, index) => (
                <article 
                  key={post.id} 
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`h-48 bg-gradient-to-br ${post.image} flex items-center justify-center hover:scale-105 transition-transform duration-300`}>
                    <Eye className="w-8 h-8 text-primary/60" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      by {post.author}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(post.id)}
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
                        onClick={() => handleFavorite(post)}
                        className="transition-colors hover:scale-110 transform hover:text-primary"
                      >
                        <BookmarkPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 animate-fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              Ready to Discover Your Style?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take our personalized style quiz and unlock your fashion potential
            </p>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-primary/90 shadow-lg hover:shadow-xl"
            >
              Start Style Quiz
            </button>
          </div>
        </section>
      </main>

      <StyleQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <Footer />
    </div>
  );
};

export default Home;