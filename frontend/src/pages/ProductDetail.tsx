
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { getProductById } from '../data/products';
import { Heart, Star, ShoppingBag, Truck, Shield, RotateCcw, ArrowLeft, BookmarkPlus } from 'lucide-react';
import { toast } from "sonner";
import { useAuth } from '../App';
import { Skeleton } from '../components/ui/skeleton';
import { getStorageData, setStorageData, STORAGE_KEYS } from '../lib/storage';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(parseInt(id || '0'));
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Simulate loading time for product details
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  // Load favorite status when user is available
  useEffect(() => {
    if (user?.username && product) {
      const savedFavorites = getStorageData(STORAGE_KEYS.FAVORITES, user.username, []);
      const isProductFavorite = savedFavorites.some((fav: any) => fav.id === product.id && fav.type === 'product');
      setIsFavorite(isProductFavorite);
    }
  }, [user?.username, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Link to="/products" className="text-primary hover:underline">
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
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
    const existing = cart.find((item: any) => item.id === product.id && item.size === selectedSize && item.color === selectedColor);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        category: product.category,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity
      });
    }
    setStorageData(STORAGE_KEYS.CART, cart, user.username);
    toast.success("Added to cart!");
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleFavorite = () => {
    if (!user?.username) return;
    
    let savedFavorites = getStorageData(STORAGE_KEYS.FAVORITES, user.username, []);
    const isAlreadyFavorite = savedFavorites.some((fav: any) => fav.id === product.id && fav.type === 'product');
    if (isAlreadyFavorite) {
      savedFavorites = savedFavorites.filter((fav: any) => !(fav.id === product.id && fav.type === 'product'));
    } else {
      savedFavorites.push({ ...product, type: 'product' });
    }
    setStorageData(STORAGE_KEYS.FAVORITES, savedFavorites, user.username);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="w-full">
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <Skeleton className="w-full h-96 rounded-xl" />
                  <div className="flex gap-4 mt-4">
                    <Skeleton className="w-20 h-20 rounded-lg" />
                    <Skeleton className="w-20 h-20 rounded-lg" />
                    <Skeleton className="w-20 h-20 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-6">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                  <div className="flex gap-4">
                    <Skeleton className="h-12 flex-1" />
                    <Skeleton className="w-12 h-12" />
                    <Skeleton className="w-12 h-12" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-4">
                  <div className={`aspect-square bg-gradient-to-br ${product.images[0]} rounded-xl flex items-center justify-center`}>
                    <ShoppingBag className="w-16 h-16 text-primary/60" />
                  </div>
                  {product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {product.images.map((image, index) => (
                        <div 
                          key={index}
                          className={`aspect-square bg-gradient-to-br ${image} rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity`}
                        >
                          <ShoppingBag className="w-8 h-8 text-primary/60" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                      {product.collection && (
                        <span className="text-sm text-muted-foreground">
                          {product.collection}
                        </span>
                      )}
                      {product.featured && (
                        <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                      {product.name}
                    </h1>
                    
                    <p className="text-lg text-muted-foreground mb-4">
                      by {product.designer}
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                      <span className="text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-3xl font-bold text-foreground">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xl text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>

                    {/* Size Selection */}
                    {product.sizes.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3">Size</h3>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map(size => (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`px-4 py-2 border rounded-lg transition-colors ${
                                selectedSize === size
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-border hover:border-primary'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Color Selection */}
                    {product.colors.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3">Color</h3>
                        <div className="flex flex-wrap gap-2">
                          {product.colors.map(color => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`px-4 py-2 border rounded-lg transition-colors ${
                                selectedColor === color
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-border hover:border-primary'
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quantity */}
                    <div>
                      <h3 className="font-semibold mb-3">Quantity</h3>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                        >
                          -
                        </button>
                        <span className="w-16 text-center font-medium">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`px-4 py-3 border rounded-lg transition-colors ${
                          isLiked ? 'border-primary text-primary' : 'border-border hover:border-primary'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={handleFavorite}
                        className={`px-4 py-3 border rounded-lg transition-colors ml-2 ${
                          isFavorite ? 'border-primary text-primary' : 'border-border hover:border-primary'
                        }`}
                        aria-label="Favorite"
                      >
                        <BookmarkPlus className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                      <div className="text-center">
                        <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium">Free Shipping</p>
                        <p className="text-xs text-muted-foreground">On orders over $100</p>
                      </div>
                      <div className="text-center">
                        <RotateCcw className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium">Easy Returns</p>
                        <p className="text-xs text-muted-foreground">30-day return policy</p>
                      </div>
                      <div className="text-center">
                        <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium">Secure Payment</p>
                        <p className="text-xs text-muted-foreground">SSL encrypted</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
