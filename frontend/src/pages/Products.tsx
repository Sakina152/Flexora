import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { products } from '../data/products';
import { Heart, Star, ShoppingBag, Filter, SortAsc, BookmarkPlus } from 'lucide-react';
import { toast } from "sonner";
import { Toaster } from "sonner";
import { useAuth } from '../App';
import { Skeleton } from '../components/ui/skeleton';
import { getStorageData, setStorageData, STORAGE_KEYS } from '../lib/storage';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [favoriteProducts, setFavoriteProducts] = useState<Set<number>>(new Set());
  const [cartMessage, setCartMessage] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = ['All', 'Minimalist', 'Vintage', 'Streetwear', 'Bohemian', 'Formal', 'Casual'];

  useEffect(() => {
    // Simulate loading time for products
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Load user-specific favorites when user is available
  useEffect(() => {
    if (user?.username) {
      const savedFavorites = getStorageData(STORAGE_KEYS.FAVORITES, user.username, []);
      setFavoriteProducts(new Set(savedFavorites.filter((item: any) => item.type === 'product').map((item: any) => item.id)));
    }
  }, [user?.username]);

  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'featured':
      default:
        return b.featured ? 1 : -1;
    }
  });

  const handleLike = (productId: number) => {
    setLikedProducts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      return newLiked;
    });
  };

  const handleFavorite = (product: any) => {
    if (!user?.username) return;
    
    let savedFavorites = getStorageData(STORAGE_KEYS.FAVORITES, user.username, []);
    const isAlreadyFavorite = savedFavorites.some((fav: any) => fav.id === product.id && fav.type === 'product');
    if (isAlreadyFavorite) {
      savedFavorites = savedFavorites.filter((fav: any) => !(fav.id === product.id && fav.type === 'product'));
    } else {
      savedFavorites.push({ ...product, type: 'product' });
    }
    setStorageData(STORAGE_KEYS.FAVORITES, savedFavorites, user.username);
    setFavoriteProducts(new Set(savedFavorites.filter((item: any) => item.type === 'product').map((item: any) => item.id)));
  };

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error('Please login to add items to your cart.');
      navigate('/login');
      return;
    }
    
    if (!user.username) {
      toast.error('User information not available.');
      return;
    }
    
    const cart = getStorageData(STORAGE_KEYS.CART, user.username, []);
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        category: product.category,
        quantity: 1
      });
    }
    setStorageData(STORAGE_KEYS.CART, cart, user.username);
    toast.success("Added to cart!");
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="w-full">
        <PageHero 
          title="All Products" 
          subtitle="Discover our complete collection of fashion items"
        />

        {/* Filters and Sorting */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Filters and Sorting */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-muted-foreground hover:text-foreground border border-border'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <SortAsc className="w-4 h-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <article key={index} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                    <Skeleton className="w-full h-64" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-16" />
                        <div className="flex gap-2">
                          <Skeleton className="w-8 h-8 rounded-full" />
                          <Skeleton className="w-8 h-8 rounded-full" />
                          <Skeleton className="w-20 h-8 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product, index) => (
                  <article 
                    key={product.id}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Link to={`/products/${product.id}`}>
                      <div className={`relative h-64 bg-gradient-to-br ${product.images[0]} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                        <ShoppingBag className="w-12 h-12 text-primary/60" />
                        {product.featured && (
                          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                          </div>
                        )}
                        {product.originalPrice && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Sale
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                        {product.collection && (
                          <span className="text-xs text-muted-foreground">
                            {product.collection}
                          </span>
                        )}
                      </div>
                      
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        by {product.designer}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-foreground">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleLike(product.id)}
                            className={`transition-colors hover:scale-110 transform ${
                              likedProducts.has(product.id) ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                            }`}
                          >
                            <Heart className={`w-5 h-5 ${likedProducts.has(product.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => handleFavorite(product)}
                            className={`ml-2 transition-colors hover:scale-110 transform ${
                              favoriteProducts.has(product.id) ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                            }`}
                            aria-label="Favorite"
                          >
                            <BookmarkPlus className={`w-5 h-5 ${favoriteProducts.has(product.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); handleAddToCart(product); }}
                            className="ml-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
                            aria-label="Add to Cart"
                          >
                            <ShoppingBag className="w-4 h-4 inline-block mr-1" />
                            Add to Cart
                          </button>
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
      <Toaster />
    </div>
  );
};

export default Products;