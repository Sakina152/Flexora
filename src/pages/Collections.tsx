
import Navigation from '../components/Navigation';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import { Palette, Heart, Eye, BookmarkPlus, Users, Star, Calendar, ArrowRight } from 'lucide-react';

const Collections = () => {
  const collections = [
    {
      id: 1,
      title: "Minimalist Essentials",
      curator: "Emma Chen",
      description: "Timeless pieces that form the foundation of a minimalist wardrobe",
      itemCount: 24,
      likes: 1250,
      views: 8900,
      followers: 450,
      category: "Minimalist",
      dateCreated: "March 2024",
      gradient: "from-accent to-secondary",
      featured: true
    },
    {
      id: 2,
      title: "Vintage Revival",
      curator: "Sophie Laurent",
      description: "Carefully curated vintage pieces with a modern twist",
      itemCount: 31,
      likes: 980,
      views: 6700,
      followers: 320,
      category: "Vintage",
      dateCreated: "February 2024",
      gradient: "from-primary/30 to-accent",
      featured: false
    },
    {
      id: 3,
      title: "Sustainable Future",
      curator: "Alex Rivera",
      description: "Eco-friendly fashion choices for conscious consumers",
      itemCount: 18,
      likes: 1580,
      views: 11200,
      followers: 670,
      category: "Sustainable",
      dateCreated: "April 2024",
      gradient: "from-secondary to-primary/20",
      featured: true
    },
    {
      id: 4,
      title: "Street Style Icons",
      curator: "Jordan Kim",
      description: "Urban fashion inspiration from street style photography",
      itemCount: 42,
      likes: 750,
      views: 5400,
      followers: 280,
      category: "Streetwear",
      dateCreated: "January 2024",
      gradient: "from-primary/40 to-secondary",
      featured: false
    },
    {
      id: 5,
      title: "Bohemian Dreams",
      curator: "Maya Patel",
      description: "Free-spirited fashion with artistic flair and natural elements",
      itemCount: 27,
      likes: 1100,
      views: 7800,
      followers: 390,
      category: "Bohemian",
      dateCreated: "March 2024",
      gradient: "from-accent/80 to-primary/30",
      featured: false
    },
    {
      id: 6,
      title: "Formal Elegance",
      curator: "David Wilson",
      description: "Sophisticated attire for professional and special occasions",
      itemCount: 19,
      likes: 890,
      views: 6100,
      followers: 240,
      category: "Formal",
      dateCreated: "February 2024",
      gradient: "from-secondary/80 to-accent",
      featured: true
    }
  ];

  const stats = [
    { label: "Total Collections", value: "156", icon: Palette },
    { label: "Featured Items", value: "2.4K", icon: Star },
    { label: "Community Curators", value: "89", icon: Users },
    { label: "Monthly Views", value: "45K", icon: Eye }
  ];

  const categories = ['All', 'Featured', 'Minimalist', 'Vintage', 'Sustainable', 'Streetwear', 'Bohemian', 'Formal'];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero
        title="Fashion Collections"
        description="Discover curated fashion collections created by our talented community of students and designers"
        className="bg-gradient-to-br from-background to-card/50"
      />

      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Stats Section */}
          <section className="mb-16 animate-fade-in">
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-card p-6 rounded-xl border border-border text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <IconComponent className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Category Filter */}
          <section className="mb-12 animate-fade-in">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 animate-scale-in ${
                    category === 'All'
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-card text-foreground border border-border hover:bg-accent hover:text-accent-foreground'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Collections Grid */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection, index) => (
                <article
                  key={collection.id}
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-48 bg-gradient-to-br ${collection.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    
                    {collection.featured && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span className="text-sm font-medium">Featured</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4">
                      <span className="bg-card/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {collection.category}
                      </span>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-xl font-bold text-foreground mb-1">
                        {collection.title}
                      </h3>
                      <p className="text-foreground/80 text-sm">by {collection.curator}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {collection.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Palette className="w-4 h-4" />
                        <span>{collection.itemCount} items</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{collection.dateCreated}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                          <Heart className="w-4 h-4" />
                          <span>{collection.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                          <Eye className="w-4 h-4" />
                          <span>{collection.views}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                          <Users className="w-4 h-4" />
                          <span>{collection.followers}</span>
                        </div>
                      </div>
                      <button className="text-primary hover:text-primary/80 transition-colors hover:scale-110 transform">
                        <BookmarkPlus className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group-hover:shadow-md">
                      View Collection
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Create Collection CTA */}
          <section className="text-center animate-fade-in">
            <div className="bg-card p-8 rounded-xl border border-border">
              <Palette className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Create Your Own Collection
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Curate your favorite fashion pieces and share your unique style perspective with the community. 
                Build collections that inspire others and showcase your creative vision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg">
                  Start Creating
                </button>
                <button className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                  Learn How
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
