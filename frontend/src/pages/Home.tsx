
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import FashionStyleQuiz from '../components/FashionStyleQuiz';
import TrendSwipePopup from '../components/TrendSwipePopup';
import { Sparkles, TrendingUp, Users, Heart, Eye, MessageCircle, BookmarkPlus, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { getStorageData, setStorageData, STORAGE_KEYS } from '../lib/storage';
import { products as allProducts } from '../data/products';

interface HomeProps {
  openQuiz?: boolean;
}

const Home = ({ openQuiz = false }: HomeProps) => {
  const { user } = useAuth();
  const [isQuizOpen, setIsQuizOpen] = useState(openQuiz);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [favoritePosts, setFavoritePosts] = useState<Set<number>>(new Set());
  const [lookbookPersona, setLookbookPersona] = useState<string | null>(null);
  const [showLookbookPopup, setShowLookbookPopup] = useState(true);
  const [showSwipe, setShowSwipe] = useState(false);
  const [swipePersona, setSwipePersona] = useState<string | null>(null);
  const [swipeProducts, setSwipeProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLookbookPersona(localStorage.getItem('flexora-last-persona'));
    const onStorage = () => setLookbookPersona(localStorage.getItem('flexora-last-persona'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (openQuiz) setIsQuizOpen(true);
  }, [openQuiz]);

  // Only show popup once per session
  useEffect(() => {
    if (sessionStorage.getItem('flexora-lookbook-popup-dismissed')) {
      setShowLookbookPopup(false);
    }
  }, []);

  const handleDismissPopup = () => {
    setShowLookbookPopup(false);
    sessionStorage.setItem('flexora-lookbook-popup-dismissed', '1');
  };

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
      image: "from-accent to-secondary",
      link: "/trending/minimalist-wardrobe"
    },
    {
      id: 2,
      title: "Sustainable Fashion: Making Conscious Choices",
      author: "Alex Rivera",
      likes: 187,
      comments: 23,
      image: "from-primary/30 to-accent",
      link: "/trending/sustainable-fashion"
    },
    {
      id: 3,
      title: "Mixing Vintage with Modern: A Style Guide",
      author: "Sophie Laurent",
      likes: 298,
      comments: 31,
      image: "from-secondary to-primary/20",
      link: "/trending/vintage-revivalT"
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

  // Load favorites when user is available
  useEffect(() => {
    if (user?.username) {
      const savedFavorites = getStorageData(STORAGE_KEYS.FAVORITES, user.username, []);
      const favoriteIds = new Set(savedFavorites.map((fav: any) => fav.id).filter((id: any) => typeof id === 'number')) as Set<number>;
      setFavoritePosts(favoriteIds);
    }
  }, [user?.username]);

  const handleFavorite = (post: any) => {
    if (!user?.username) return;
    
    const savedFavorites = getStorageData(STORAGE_KEYS.FAVORITES, user.username, []);
    const isAlreadyFavorite = savedFavorites.some((fav: any) => fav.id === post.id);
    
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...savedFavorites, { ...post, type: 'post' }];
      setStorageData(STORAGE_KEYS.FAVORITES, updatedFavorites, user.username);
      setFavoritePosts(prev => new Set([...prev, post.id]));
    } else {
      const updatedFavorites = savedFavorites.filter((fav: any) => fav.id !== post.id);
      setStorageData(STORAGE_KEYS.FAVORITES, updatedFavorites, user.username);
      setFavoritePosts(prev => {
        const newFavs = new Set(prev);
        newFavs.delete(post.id);
        return newFavs;
      });
    }
  };

  const handleOpenSwipe = () => {
    const persona = localStorage.getItem('flexora-last-persona');
    setSwipePersona(persona);
    let filtered;
    if (persona) {
      // mimic Lookbook persona filtering
      const personaMap: Record<string, string> = {
        'minimalist-style': 'Minimalist',
        'bohemian-style': 'Bohemian',
        'vintage-style': 'Vintage',
        'casual-style': 'Casual',
        'streetwear-style': 'Streetwear',
        'formal-style': 'Formal',
      };
      const style = personaMap[persona] || '';
      filtered = allProducts.filter(p => p.category === style);
    } else {
      filtered = allProducts;
    }
    setSwipeProducts(filtered.map(p => ({
      id: p.id,
      name: p.name,
      images: p.images,
      tags: [p.category, ...(p.tags || [])],
    })));
    setShowSwipe(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="w-full">
        {/* Resume Lookbook Popup */}
        {lookbookPersona && showLookbookPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
            <div className="relative bg-background border border-primary/20 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
              <button
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground p-1 rounded-full transition-colors"
                onClick={handleDismissPopup}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center gap-3">
                <div className="text-5xl mb-2">✨</div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-1 text-center">Resume Your Lookbook</h3>
                <p className="text-muted-foreground mb-4 text-center">Jump back into your personalized style recommendations and curated products.</p>
                <Link
                  to={`/lookbook/${lookbookPersona}`}
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90 shadow"
                  onClick={handleDismissPopup}
                >
                  Go to Your Lookbook
                </Link>
              </div>
            </div>
          </div>
        )}
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
                <Link to={post.link} key={post.id} style={{ animationDelay: `${index * 150}ms` }} className="block animate-fade-in">
                  <article
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className={`h-48 bg-gradient-to-br ${post.image} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                      <Eye className="w-8 h-8 text-primary/60" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        by {post.author}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={e => { e.preventDefault(); handleLike(post.id); }}
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
                          onClick={e => { e.preventDefault(); handleFavorite(post); }}
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
        {/* Floating Action Button for Trend Swipe */}
        <TrendSwipePopup
          persona={swipePersona || 'minimalist-style'}
          products={swipeProducts}
          isOpen={showSwipe}
          onClose={() => setShowSwipe(false)}
          onComplete={(liked, skipped) => {
            localStorage.setItem(`flexora-swipe-results-${swipePersona || 'minimalist-style'}`, JSON.stringify({ liked, skipped }));
            setShowSwipe(false);
            if (swipePersona) navigate(`/lookbook/${swipePersona}`);
            else navigate('/lookbook/minimalist-style');
          }}
        />
        <button
          className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg flex items-center justify-center hover:scale-110 transition-all group"
          style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.15)' }}
          onClick={handleOpenSwipe}
          title="Try Trend Swipe"
          aria-label="Try Trend Swipe"
        >
          <Sparkles className="w-8 h-8 text-primary-foreground group-hover:animate-pulse" />
          <span className="absolute bottom-20 right-0 bg-background text-foreground text-xs rounded px-3 py-1 shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Try Trend Swipe</span>
        </button>
      </main>

      <FashionStyleQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <Footer />
    </div>
  );
};

export default Home;