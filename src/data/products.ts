
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  collection?: string;
  designer: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
  tags: string[];
}

export const products: Product[] = [
  // Minimalist Category Products
  {
    id: 1,
    name: "Classic White Button Down",
    price: 89,
    originalPrice: 129,
    description: "A timeless white button-down shirt crafted from premium cotton. Perfect for both professional and casual settings.",
    images: ["from-primary/20 to-accent/10"],
    category: "Minimalist",
    collection: "Summer Vibes Collection",
    designer: "Emma Chen",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Light Blue", "Cream"],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 124,
    tags: ["essentials", "professional", "cotton"]
  },
  {
    id: 2,
    name: "Tailored Black Trousers",
    price: 145,
    description: "Perfectly tailored black trousers with a modern slim fit. Made from premium wool blend for comfort and durability.",
    images: ["from-secondary/30 to-primary/20"],
    category: "Minimalist",
    designer: "Olivia White",
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["Black", "Navy", "Charcoal"],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 89,
    tags: ["professional", "wool", "tailored"]
  },
  {
    id: 3,
    name: "Cashmere Turtleneck",
    price: 225,
    description: "Luxurious cashmere turtleneck in neutral tones. The perfect layering piece for sophisticated minimalist looks.",
    images: ["from-accent/20 to-secondary/10"],
    category: "Minimalist",
    designer: "Olivia White",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Beige", "Cream", "Light Gray"],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 67,
    tags: ["luxury", "cashmere", "layering"]
  },

  // Bohemian Category Products
  {
    id: 4,
    name: "Flowing Maxi Dress",
    price: 165,
    originalPrice: 210,
    description: "A beautiful flowing maxi dress with intricate embroidered details. Perfect for free-spirited fashion lovers.",
    images: ["from-accent/30 to-primary/20"],
    category: "Bohemian",
    collection: "Summer Vibes Collection",
    designer: "Sophie Laurent",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Terracotta", "Sage Green", "Dusty Rose"],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 156,
    tags: ["maxi", "embroidered", "flowy"]
  },
  {
    id: 5,
    name: "Vintage Denim Jacket",
    price: 98,
    description: "Authentic vintage-style denim jacket with distressed details and unique character.",
    images: ["from-primary/30 to-secondary/20"],
    category: "Bohemian",
    designer: "Sophie Laurent",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Vintage Blue", "Light Wash", "Dark Wash"],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 203,
    tags: ["vintage", "denim", "layering"]
  },
  {
    id: 6,
    name: "Crochet Cardigan",
    price: 132,
    description: "Hand-crocheted cardigan with intricate patterns. A bohemian essential for layering.",
    images: ["from-secondary/20 to-accent/30"],
    category: "Bohemian",
    designer: "Sophie Laurent",
    sizes: ["S", "M", "L"],
    colors: ["Cream", "Sage", "Rust"],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 78,
    tags: ["crochet", "handmade", "cardigan"]
  },

  // Summer Vibes Collection Products
  {
    id: 7,
    name: "Sunset Orange Dress",
    price: 155,
    description: "Flowy maxi dress in vibrant sunset orange. Perfect for beach days and summer evenings.",
    images: ["from-primary/30 to-accent"],
    category: "Casual",
    collection: "Summer Vibes Collection",
    designer: "Emma Chen",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sunset Orange", "Coral Pink", "Golden Yellow"],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 94,
    tags: ["summer", "maxi", "vibrant"]
  },
  {
    id: 8,
    name: "Tropical Print Wrap Dress",
    price: 142,
    description: "Mid-length wrap dress with beautiful tropical print. Comfortable and stylish for warm weather.",
    images: ["from-accent/20 to-secondary/30"],
    category: "Casual",
    collection: "Summer Vibes Collection",
    designer: "Emma Chen",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Tropical Print", "Palm Print"],
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 127,
    tags: ["tropical", "wrap", "print"]
  },

  // Elegant Evening Wear Collection Products
  {
    id: 9,
    name: "Black Silk Evening Dress",
    price: 345,
    description: "Elegant black silk dress perfect for formal occasions. Features a sophisticated silhouette and premium fabric.",
    images: ["from-accent to-secondary"],
    category: "Formal",
    collection: "Elegant Evening Wear",
    designer: "Alex Rivera",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Deep Burgundy"],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 45,
    tags: ["silk", "formal", "elegant"]
  },
  {
    id: 10,
    name: "Tailored Suit Set",
    price: 425,
    description: "Professional suit set with blazer and matching trousers. Perfect for business meetings and formal events.",
    images: ["from-secondary to-primary/20"],
    category: "Formal",
    collection: "Elegant Evening Wear",
    designer: "Alex Rivera",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Charcoal", "Navy", "Black"],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 67,
    tags: ["suit", "professional", "tailored"]
  },

  // Street Style Products
  {
    id: 11,
    name: "Graphic Oversized Hoodie",
    price: 78,
    description: "Comfortable oversized hoodie with bold graphics. Perfect for casual streetwear looks.",
    images: ["from-accent/30 to-primary/20"],
    category: "Streetwear",
    collection: "Street Style Essentials",
    designer: "David Kim",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Gray"],
    inStock: true,
    featured: false,
    rating: 4.3,
    reviews: 189,
    tags: ["hoodie", "streetwear", "oversized"]
  },
  {
    id: 12,
    name: "Distressed High-Waist Jeans",
    price: 125,
    description: "Trendy high-waist jeans with distressed details. A streetwear essential for urban fashion lovers.",
    images: ["from-secondary/30 to-accent/20"],
    category: "Streetwear",
    collection: "Street Style Essentials",
    designer: "David Kim",
    sizes: ["24", "26", "28", "30", "32"],
    colors: ["Light Wash", "Medium Wash", "Dark Wash"],
    inStock: true,
    featured: true,
    rating: 4.5,
    reviews: 234,
    tags: ["jeans", "distressed", "high-waist"]
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductsByCollection = (collection: string) => {
  return products.filter(product => product.collection === collection);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};
