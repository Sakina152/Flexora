
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import PageHero from '../components/PageHero';
import { Eye, Users, ArrowRight } from 'lucide-react';

const StyleCategories = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = [
    {
      id: 1,
      name: "Minimalist",
      description: "Clean lines, neutral colors, and timeless elegance",
      itemCount: 156,
      followers: 2340,
      image: "gradient-to-br from-accent to-secondary",
      color: "from-gray-50 to-gray-100"
    },
    {
      id: 2,
      name: "Bohemian",
      description: "Free-spirited, eclectic, and artfully layered looks",
      itemCount: 203,
      followers: 1890,
      image: "gradient-to-br from-primary/30 to-accent",
      color: "from-orange-50 to-pink-100"
    },
    {
      id: 3,
      name: "Vintage",
      description: "Timeless pieces with classic charm and nostalgia",
      itemCount: 289,
      followers: 3120,
      image: "gradient-to-br from-secondary to-primary/20",
      color: "from-amber-50 to-yellow-100"
    },
    {
      id: 4,
      name: "Streetwear",
      description: "Urban-inspired, casual comfort meets contemporary style",
      itemCount: 178,
      followers: 2890,
      image: "gradient-to-br from-muted to-accent",
      color: "from-slate-50 to-gray-100"
    },
    {
      id: 5,
      name: "Formal",
      description: "Sophisticated elegance for professional and special occasions",
      itemCount: 134,
      followers: 1650,
      image: "gradient-to-br from-primary to-secondary",
      color: "from-blue-50 to-indigo-100"
    },
    {
      id: 6,
      name: "Casual Chic",
      description: "Effortlessly stylish everyday wear with polished touches",
      itemCount: 267,
      followers: 2150,
      image: "gradient-to-br from-accent via-secondary to-primary/30",
      color: "from-green-50 to-emerald-100"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        {/* <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} /> */}
        
        <main className="flex-1 md:ml-0">
          <PageHero 
            title="Style Categories" 
            subtitle="Explore different fashion aesthetics and find your perfect style"
            backgroundGradient="from-secondary/30 via-accent/20 to-primary/10"
          />
          
          {/* Categories Grid */}
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                  <article 
                    key={category.id}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Category Image */}
                    <div className="relative">
                      <div className={`h-48 bg-gradient-to-br ${category.image} flex items-center justify-center hover:scale-105 transition-transform duration-300`}>
                        <Eye className="w-8 h-8 text-primary/60" />
                      </div>
                      
                      {/* Overlay with item count */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-sm font-medium">{category.itemCount} items</p>
                        </div>
                      </div>
                    </div>

                    {/* Category Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {category.name}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {category.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{category.itemCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{category.followers}</span>
                          </div>
                        </div>
                        
                        <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors">
                          Explore
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Collections */}
          <section className="py-16 px-6 bg-card/50">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Can't Find Your Style?
              </h2>
              <p className="text-muted-foreground mb-8">
                Take our personalized style quiz to discover new aesthetics that match your personality
              </p>
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Take Style Quiz
              </button>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default StyleCategories;
