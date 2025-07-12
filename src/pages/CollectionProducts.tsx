
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { getProductsByCollection } from '../data/products';
import { Heart, Star, ShoppingBag, ArrowLeft } from 'lucide-react';

const CollectionProducts = () => {
  const { collection } = useParams<{ collection: string }>();
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  
  const collectionName = collection?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
  const products = getProductsByCollection(collectionName);

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

  const getGradientForCollection = (collection: string) => {
    switch (collection) {
      case 'Summer Vibes Collection':
        return 'from-primary/30 to-accent';
      case 'Elegant Evening Wear':
        return 'from-accent to-secondary';
      case 'Street Style Essentials':
        return 'from-accent/30 to-primary/20';
      default:
        return 'from-primary/20 to-accent/30';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="w-full">
        <PageHero 
          title={collectionName}
          subtitle={`Shop the complete ${collectionName.toLowerCase()}`}
          backgroundGradient={getGradientForCollection(collectionName)}
        />

        {/* Breadcrumb */}
        <section className="py-6 px-6 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/collections" className="hover:text-primary flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                All Collections
              </Link>
              <span>/</span>
              <span className="text-foreground">{collectionName}</span>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">No Products Found</h2>
                <p className="text-muted-foreground mb-6">
                  We don't have any products in the {collectionName} yet.
                </p>
                <Link 
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Browse All Products
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-foreground">
                    {products.length} {products.length === 1 ? 'Product' : 'Products'} in Collection
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product, index) => (
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
                          <button
                            onClick={() => handleLike(product.id)}
                            className={`transition-colors hover:scale-110 transform ${
                              likedProducts.has(product.id) ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                            }`}
                          >
                            <Heart className={`w-5 h-5 ${likedProducts.has(product.id) ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionProducts;
