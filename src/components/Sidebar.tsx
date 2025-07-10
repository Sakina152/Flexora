
import { useState } from 'react';
import { Palette, Star, Camera, ChevronRight, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const categories = [
    { name: 'Minimalist', count: 24 },
    { name: 'Bohemian', count: 18 },
    { name: 'Vintage', count: 31 },
    { name: 'Streetwear', count: 27 },
    { name: 'Formal', count: 19 },
    { name: 'Casual Chic', count: 35 },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden" 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-card border-r border-border p-6 
        overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:sticky md:translate-x-0
      `}>
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-accent rounded-lg transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Categories Section */}
        <div className="mb-8 animate-fade-in">
          <h3 className="font-display text-xl font-semibold text-foreground mb-4">
            Style Categories
          </h3>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index} className="transform transition-all duration-300 hover:translate-x-1">
                <a
                  href="/style-categories"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-all duration-300 group hover:shadow-sm"
                >
                  <span className="font-medium text-foreground group-hover:text-accent-foreground transition-colors">
                    {category.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {category.count}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Style Section */}
        <div className="mb-8 p-4 bg-accent rounded-lg hover:shadow-md transition-all duration-300 animate-scale-in">
          <div className="mb-4">
            <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent rounded-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <Camera className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h4 className="font-display font-semibold text-accent-foreground mb-2">
            Trending Now
          </h4>
          <p className="text-sm text-accent-foreground/80 leading-relaxed">
            Minimalist elegance meets contemporary sophistication in this week's featured style.
          </p>
        </div>

        {/* Style Quiz Section */}
        <div className="p-4 bg-primary rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-in-right">
          <Palette className="w-8 h-8 text-primary-foreground mx-auto mb-3" />
          <h4 className="font-display font-semibold text-primary-foreground mb-2">
            Discover Your Style
          </h4>
          <p className="text-sm text-primary-foreground/90 mb-4">
            Take our personalized quiz to find your unique fashion aesthetic.
          </p>
          <button
            onClick={() => setIsQuizOpen(true)}
            className="w-full bg-primary-foreground text-primary px-4 py-2 rounded-md font-medium hover:bg-accent transition-all duration-300 transform hover:scale-105"
          >
            Start Quiz
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
