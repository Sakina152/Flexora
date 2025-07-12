import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { Heart, Eye, MessageCircle, BookmarkPlus } from 'lucide-react';
import { Sparkles, Leaf, Camera, Shirt, CheckCircle, Cloud } from 'lucide-react';

const StyleCategories = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const categories = [
    {
      name: 'Minimalist',
      description: 'Clean lines, neutral colors, and functional designs for a modern and simple style.',
      icon: Sparkles,
      count: 24,
      gradient: 'from-primary/30 to-accent/20',
      link: '/categories/minimalist'
    },
    {
      name: 'Bohemian',
      description: 'Earthy tones, vintage patterns, and relaxed silhouettes for a free-spirited and eclectic style.',
      icon: Leaf,
      count: 18,
      gradient: 'from-accent/20 to-secondary/30',
      link: '/categories/bohemian'
    },
    {
      name: 'Vintage',
      description: 'Classic cuts, retro prints, and timeless accessories inspired by past decades.',
      icon: Camera,
      count: 31,
      gradient: 'from-secondary/30 to-primary/20',
      link: '#'
    },
    {
      name: 'Streetwear',
      description: 'Bold graphics, oversized fits, and urban-inspired elements for a trendy and edgy style.',
      icon: Shirt,
      count: 27,
      gradient: 'from-accent/30 to-primary/20',
      link: '#'
    },
    {
      name: 'Formal',
      description: 'Sophisticated fabrics, tailored designs, and elegant details for a polished and refined style.',
      icon: CheckCircle,
      count: 19,
      gradient: 'from-primary/20 to-secondary/30',
      link: '#'
    },
    {
      name: 'Casual Chic',
      description: 'Comfortable fabrics, effortless silhouettes, and stylish accents for a relaxed yet put-together style.',
      icon: Cloud,
      count: 35,
      gradient: 'from-secondary/20 to-accent/30',
      link: '#'
    },
  ];

  const styleCards = [
    {
      id: 1,
      title: "Effortless Summer Style",
      author: "Emma Chen",
      likes: 234,
      comments: 18,
      image: "from-accent to-secondary"
    },
    {
      id: 2,
      title: "Sustainable Fashion Choices",
      author: "Alex Rivera",
      likes: 187,
      comments: 23,
      image: "from-primary/30 to-accent"
    },
    {
      id: 3,
      title: "Mixing Vintage with Modern",
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
        <PageHero 
          title="Style Categories"
          subtitle="Explore different fashion aesthetics and find your perfect style"
          backgroundGradient="from-primary/20 to-accent/30"
        />

        {/* Categories Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={category.link}
                  className="block"
                >
                  <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`h-48 bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                      <category.icon className="w-12 h-12 text-primary/80" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">
                          {category.count} items
                        </span>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                          Explore
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Styles */}
        <section className="py-16 px-6 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Featured Styles
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {styleCards.map((card, index) => (
                <article 
                  key={card.id} 
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`h-48 bg-gradient-to-br ${card.image} flex items-center justify-center hover:scale-105 transition-transform duration-300`}>
                    <Eye className="w-8 h-8 text-primary/60" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      by {card.author}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(card.id)}
                          className={`flex items-center gap-1 transition-colors ${
                            likedPosts.has(card.id) ? 'text-primary' : 'hover:text-primary'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedPosts.has(card.id) ? 'fill-current' : ''}`} />
                          <span>{card.likes + (likedPosts.has(card.id) ? 1 : 0)}</span>
                        </button>
                        <div className="flex items-center gap-1 hover:text-primary transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>{card.comments}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleFavorite(card)}
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
      </main>

      <Footer />
    </div>
  );
};

export default StyleCategories;