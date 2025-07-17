import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { ArrowLeft, Heart, Share2, BookmarkPlus, Sparkles, ShoppingBag, Star, Eye } from 'lucide-react';
import { toast } from "sonner";
import { products, Product } from '../data/products';

interface LookbookItem {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  designer: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  trending?: boolean;
  sizes?: string[];
  colors?: string[];
}

interface PersonaData {
  title: string;
  description: string;
  color: string;
  recommendations: string[];
  items: LookbookItem[];
  trendingStyles: string[];
}

// Function to get products that match each style persona
const getProductsForPersona = (persona: string): Product[] => {
  switch (persona) {
    case 'minimalist-style':
      return products.filter(product => 
        product.category === 'Minimalist' || 
        product.tags.some(tag => ['minimalist', 'essentials', 'professional', 'clean', 'simple'].includes(tag.toLowerCase()))
      );
    case 'bohemian-style':
      return products.filter(product => 
        product.category === 'Bohemian' || 
        product.tags.some(tag => ['bohemian', 'boho', 'free-spirited', 'artistic', 'flowy', 'embroidered'].includes(tag.toLowerCase()))
      );
    case 'vintage-style':
      return products.filter(product => 
        product.category === 'Vintage' || 
        product.tags.some(tag => ['vintage', 'retro', 'classic', 'timeless', 'sophisticated'].includes(tag.toLowerCase()))
      );
    case 'casual-style':
      return products.filter(product => 
        product.category === 'Casual' || 
        product.tags.some(tag => ['casual', 'comfortable', 'versatile', 'everyday', 'relaxed'].includes(tag.toLowerCase()))
      );
    case 'streetwear-style':
      return products.filter(product => 
        product.category === 'Streetwear' || 
        product.tags.some(tag => ['streetwear', 'urban', 'street', 'oversized', 'graphic'].includes(tag.toLowerCase()))
      );
    case 'formal-style':
      return products.filter(product => 
        product.category === 'Formal' || 
        product.tags.some(tag => ['formal', 'elegant', 'professional', 'sophisticated', 'evening'].includes(tag.toLowerCase()))
      );
    default:
      return products.slice(0, 12); // Default fallback
  }
};

// Convert Product to LookbookItem
const convertProductToLookbookItem = (product: Product): LookbookItem => ({
  id: product.id,
  title: product.name,
  description: product.description,
  category: product.category,
  price: product.price,
  originalPrice: product.originalPrice,
  image: product.images[0] || 'placeholder',
  designer: product.designer,
  rating: product.rating,
  reviews: product.reviews,
  featured: product.featured,
  trending: product.featured, // Use featured as trending indicator
  sizes: product.sizes,
  colors: product.colors
});

const personaData: Record<string, PersonaData> = {
  'minimalist-style': {
    title: "Minimalist Style Lookbook",
    description: "Clean lines, quality over quantity, and timeless pieces that speak to your sophisticated aesthetic.",
    color: "from-gray-400 to-gray-600",
    recommendations: [
      "Invest in high-quality basics",
      "Stick to a neutral color palette",
      "Focus on clean silhouettes",
      "Choose versatile pieces that mix and match"
    ],
    trendingStyles: ["Capsule Wardrobe", "Neutral Tones", "Clean Lines", "Quality Basics"],
    items: getProductsForPersona('minimalist-style').map(convertProductToLookbookItem)
  },
  'bohemian-style': {
    title: "Bohemian Style Lookbook",
    description: "Free-spirited and artistic pieces that celebrate your creative expression and love for eclectic style.",
    color: "from-amber-400 to-orange-500",
    recommendations: [
      "Mix patterns and textures freely",
      "Layer jewelry and accessories",
      "Choose flowing, comfortable fabrics",
      "Embrace earthy and warm tones"
    ],
    trendingStyles: ["Free Spirit", "Artistic Expression", "Layered Looks", "Earthy Tones"],
    items: getProductsForPersona('bohemian-style').map(convertProductToLookbookItem)
  },
  'vintage-style': {
    title: "Vintage Style Lookbook",
    description: "Timeless elegance and classic sophistication that reflects your appreciation for fashion history.",
    color: "from-rose-400 to-pink-500",
    recommendations: [
      "Look for quality vintage pieces",
      "Embrace classic silhouettes",
      "Choose sophisticated accessories",
      "Mix vintage with modern touches"
    ],
    trendingStyles: ["Classic Elegance", "Timeless Fashion", "Sophisticated Look", "Retro Vibes"],
    items: getProductsForPersona('vintage-style').map(convertProductToLookbookItem)
  },
  'casual-style': {
    title: "Casual Style Lookbook",
    description: "Comfortable and versatile pieces that maintain style while prioritizing ease and practicality.",
    color: "from-blue-400 to-indigo-500",
    recommendations: [
      "Choose comfortable, breathable fabrics",
      "Focus on versatile, mix-and-match pieces",
      "Keep accessories simple and practical",
      "Prioritize comfort without sacrificing style"
    ],
    trendingStyles: ["Weekend Casual", "Comfort First", "Versatile Pieces", "Easy Style"],
    items: getProductsForPersona('casual-style').map(convertProductToLookbookItem)
  },
  'streetwear-style': {
    title: "Streetwear Style Lookbook",
    description: "Urban and edgy pieces that reflect your bold, contemporary fashion sense and love for street culture.",
    color: "from-purple-400 to-pink-500",
    recommendations: [
      "Mix high and low fashion",
      "Embrace bold graphics and logos",
      "Layer pieces for depth",
      "Choose comfortable, statement pieces"
    ],
    trendingStyles: ["Urban Edge", "Bold Graphics", "Layered Street Style", "Contemporary Cool"],
    items: getProductsForPersona('streetwear-style').map(convertProductToLookbookItem)
  },
  'formal-style': {
    title: "Formal Style Lookbook",
    description: "Sophisticated and elegant pieces that showcase your refined taste and professional demeanor.",
    color: "from-emerald-400 to-teal-500",
    recommendations: [
      "Invest in quality formal pieces",
      "Choose sophisticated accessories",
      "Focus on tailored fits",
      "Maintain a polished appearance"
    ],
    trendingStyles: ["Sophisticated Elegance", "Professional Polish", "Refined Taste", "Timeless Luxury"],
    items: getProductsForPersona('formal-style').map(convertProductToLookbookItem)
  }
};

const Lookbook = () => {
  const { persona } = useParams<{ persona: string }>();
  const navigate = useNavigate();
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [favoriteItems, setFavoriteItems] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Persist persona to localStorage if present
  useEffect(() => {
    if (persona) {
      localStorage.setItem('flexora-last-persona', persona);
    }
  }, [persona]);

  // If no persona in URL, try to restore from localStorage
  useEffect(() => {
    if (!persona) {
      const lastPersona = localStorage.getItem('flexora-last-persona');
      if (lastPersona && personaData[lastPersona]) {
        navigate(`/lookbook/${lastPersona}`, { replace: true });
      }
    }
  }, [persona, navigate]);

  const data = personaData[persona || 'minimalist-style'];
  
  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Lookbook Not Found</h1>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg"
            >
              Go Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const categories = ['All', ...Array.from(new Set(data.items.map(item => item.category)))];
  const filteredItems = selectedCategory === 'All' 
    ? data.items 
    : data.items.filter(item => item.category === selectedCategory);

  const handleLike = (itemId: number) => {
    setLikedItems(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(itemId)) {
        newLiked.delete(itemId);
      } else {
        newLiked.add(itemId);
      }
      return newLiked;
    });
  };

  const handleFavorite = (item: LookbookItem) => {
    const savedFavorites = JSON.parse(localStorage.getItem('flexora-favorites') || '[]');
    const isAlreadyFavorite = savedFavorites.some((fav: any) => fav.id === item.id);
    
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...savedFavorites, { ...item, type: 'product' }];
      localStorage.setItem('flexora-favorites', JSON.stringify(updatedFavorites));
      setFavoriteItems(prev => new Set([...prev, item.id]));
      toast.success("Added to favorites!");
    } else {
      const updatedFavorites = savedFavorites.filter((fav: any) => fav.id !== item.id);
      localStorage.setItem('flexora-favorites', JSON.stringify(updatedFavorites));
      setFavoriteItems(prev => {
        const newFavs = new Set(prev);
        newFavs.delete(item.id);
        return newFavs;
      });
      toast.success("Removed from favorites!");
    }
  };

  const handleAddToCart = (item: LookbookItem) => {
    const cart = JSON.parse(localStorage.getItem('flexora-cart') || '[]');
    const existing = cart.find((cartItem: any) => cartItem.id === item.id);
    
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({
        id: item.id,
        name: item.title,
        price: item.price,
        images: [item.image],
        category: item.category,
        quantity: 1
      });
    }
    
    localStorage.setItem('flexora-cart', JSON.stringify(cart));
    toast.success("Added to cart!");
    window.dispatchEvent(new Event('cart-updated'));
  };

  useEffect(() => {
    // Load favorite items from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('flexora-favorites') || '[]');
    const favoriteIds = new Set(savedFavorites.map((fav: any) => fav.id).filter((id: any) => typeof id === 'number')) as Set<number>;
    setFavoriteItems(favoriteIds);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="w-full">
        <PageHero 
          title={data.title}
          subtitle={data.description}
          backgroundGradient="from-accent/30 to-secondary/20"
        />

        {/* Trending Styles */}
        <section className="py-8 px-6 bg-card/50 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 text-center">
              Trending in Your Style
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {data.trendingStyles.map((style, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-accent/20 text-primary rounded-full text-sm font-medium border border-border"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Style Recommendations */}
        <section className="py-12 px-6 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
              Style Recommendations
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="p-4 bg-card rounded-lg border border-border text-center shadow-sm"
                >
                  <p className="text-sm text-muted-foreground">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            {/* Products Count and Category Filter */}
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Your Personalized Collection
              </h2>
              <p className="text-muted-foreground mb-6">
                {filteredItems.length} products curated for your {data.title.toLowerCase().replace(' lookbook', '')} style
              </p>
              
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-muted-foreground hover:text-foreground border-border'
                    }`}
                  >
                    {category} ({data.items.filter(item => category === 'All' || item.category === category).length})
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <article 
                  key={item.id} 
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link to={`/products/${item.id}`}>
                    <div className="h-64 bg-gradient-to-br from-primary-cream to-soft-pink flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative">
                      <div className="grid grid-cols-3 gap-1 w-24 h-24">
                        <div className="bg-gradient-to-br from-amber-200 to-rose-200 rounded"></div>
                        <div className="bg-gradient-to-br from-blue-200 to-purple-200 rounded"></div>
                        <div className="bg-gradient-to-br from-green-200 to-teal-200 rounded"></div>
                        <div className="bg-gradient-to-br from-pink-200 to-orange-200 rounded"></div>
                        <div className="bg-gradient-to-br from-yellow-200 to-amber-200 rounded"></div>
                        <div className="bg-gradient-to-br from-indigo-200 to-blue-200 rounded"></div>
                        <div className="bg-gradient-to-br from-red-200 to-pink-200 rounded"></div>
                        <div className="bg-gradient-to-br from-purple-200 to-indigo-200 rounded"></div>
                        <div className="bg-gradient-to-br from-teal-200 to-green-200 rounded"></div>
                      </div>
                      {item.featured && (
                        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}
                      {item.trending && (
                        <div className="absolute top-3 right-3 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
                          Trending
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <Link to={`/products/${item.id}`}>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2">
                      by {item.designer}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({item.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleLike(item.id)}
                          className={`p-2 rounded-full transition-colors ${
                            likedItems.has(item.id) 
                              ? 'text-red-500 bg-red-50' 
                              : 'text-muted-foreground hover:text-red-500 hover:bg-red-50'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedItems.has(item.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleFavorite(item)}
                          className={`p-2 rounded-full transition-colors ${
                            favoriteItems.has(item.id)
                              ? 'text-primary bg-primary/10'
                              : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                          }`}
                        >
                          <BookmarkPlus className={`w-4 h-4 ${favoriteItems.has(item.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Explore More Products Section */}
        <section className="py-16 px-6 bg-card/50 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Explore More Products
            </h2>
            <p className="text-muted-foreground mb-8">
              Discover our full collection of products across all categories and styles
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Link
                to="/products"
                className="p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors group"
              >
                <div className="text-2xl mb-2">👕</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">All Products</h3>
                <p className="text-xs text-muted-foreground">{products.length} items</p>
              </Link>
              <Link
                to="/trending-looks"
                className="p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors group"
              >
                <div className="text-2xl mb-2">🔥</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Trending</h3>
                <p className="text-xs text-muted-foreground">Latest styles</p>
              </Link>
              <Link
                to="/categories"
                className="p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors group"
              >
                <div className="text-2xl mb-2">📂</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Categories</h3>
                <p className="text-xs text-muted-foreground">Browse by style</p>
              </Link>
              <Link
                to="/collections"
                className="p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors group"
              >
                <div className="text-2xl mb-2">🎨</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Collections</h3>
                <p className="text-xs text-muted-foreground">Curated sets</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-background border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              Love Your Style Persona?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take the quiz again or explore more styles to discover new fashion possibilities
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-primary/90"
              >
                Take Quiz Again
              </button>
              <button
                onClick={() => navigate('/trending-looks')}
                className="px-6 py-3 bg-card text-foreground border border-border rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-card/80"
              >
                Explore Trending Styles
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Lookbook; 