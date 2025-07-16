import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { products } from '../data/products';
import { Heart, Star, ShoppingBag, Filter, SortAsc, BookmarkPlus } from 'lucide-react';
import { toast } from "sonner";
import { Toaster } from "sonner";

const Products = () => {
  useEffect(() => { toast.success("Test toast!"); }, []);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [favoriteProducts, setFavoriteProducts] = useState<Set<number>>(() => {
    const saved = JSON.parse(localStorage.getItem('flexora-favorites') || '[]');
    return new Set(saved.filter(item => item.type === 'product').map(item => item.id));
  });
  const [cartMessage, setCartMessage] = useState("");

  const categories = ['All', 'Minimalist', 'Vintage', 'Streetwear', 'Bohemian', 'Formal', 'Casual'];

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
    let savedFavorites = JSON.parse(localStorage.getItem('flexora-favorites') || '[]');
    const isAlreadyFavorite = savedFavorites.some((fav: any) => fav.id === product.id && fav.type === 'product');
    if (isAlreadyFavorite) {
      savedFavorites = savedFavorites.filter((fav: any) => !(fav.id === product.id && fav.type === 'product'));
    } else {
      savedFavorites.push({ ...product, type: 'product' });
    }
    localStorage.setItem('flexora-favorites', JSON.stringify(savedFavorites));
    setFavoriteProducts(new Set(savedFavorites.filter((item: any) => item.type === 'product').map((item: any) => item.id)));
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('flexora-cart') || '[]');
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
    localStorage.setItem('flexora-cart', JSON.stringify(cart));
    toast.success("Added to cart!");
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="w-full">
        <PageHero 
          title="Shop Products"
          subtitle="Discover our curated collection of fashion pieces from talented designers"
          backgroundGradient="from-primary/20 to-accent/30"
        />

        {/* Filters and Sort */}
        <section className="py-8 px-6 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <SortAsc className="w-5 h-5 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-card border border-border rounded-lg text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          </div>
        </section>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
};

export default Products;