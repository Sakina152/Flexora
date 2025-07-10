
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { Heart, Eye, MessageCircle, ShoppingBag } from 'lucide-react';

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    // Get favorites from localStorage
    const savedFavorites = localStorage.getItem('flexora-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleRemoveFromFavorites = (itemId: number) => {
    const updatedFavorites = favorites.filter(item => item.id !== itemId);
    setFavorites(updatedFavorites);
    localStorage.setItem('flexora-favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="flex-1">
        <PageHero 
          title="Your Favorites" 
          subtitle="Your collection of liked styles and inspirations"
          backgroundGradient="from-primary/20 via-accent/10 to-secondary/20"
        />
        
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            {favorites.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="mb-6">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                    No favorites yet
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    Start exploring our amazing collection and heart the styles you love to see them here!
                  </p>
                </div>
                <button 
                  onClick={() => window.location.href = '/trending-looks'}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Explore Styles
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((item, index) => (
                  <article 
                    key={item.id}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative">
                      <div className={`h-64 bg-gradient-to-br ${item.image} flex items-center justify-center hover:scale-105 transition-transform duration-300`}>
                        <Eye className="w-8 h-8 text-primary/60" />
                      </div>
                      
                      <button
                        onClick={() => handleRemoveFromFavorites(item.id)}
                        className="absolute top-3 right-3 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      {item.author && (
                        <p className="text-sm text-muted-foreground mb-3">
                          by {item.author}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4 fill-current text-primary" />
                            <span>{item.likes || 0}</span>
                          </div>
                          {item.comments && (
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{item.comments}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
