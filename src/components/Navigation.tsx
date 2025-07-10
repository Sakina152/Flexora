
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

interface NavigationProps {
  onMenuClick?: () => void;
}

const Navigation = ({ onMenuClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/trending-looks', label: 'Trending Looks' },
    { path: '/style-categories', label: 'Style Categories' },
    { path: '/student-spotlights', label: 'Student Spotlights' },
    { path: '/collections', label: 'Collections' },
    { path: '/favorites', label: 'Favorites', icon: Heart },
  ];

  return (
    <nav className="fixed top-0 w-full bg-card/95 backdrop-blur-md z-40 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            {/* Sidebar toggle for mobile */}
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors mr-2"
              >
                <Menu size={20} />
              </button>
            )}
            
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-primary/20">
                <img 
                  src="/flexora-logo.png" 
                  alt="FLEXORA Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-foreground tracking-wide">
                  FLEXORA
                </div>
                <div className="text-xs text-primary font-medium -mt-1">
                  Flex your Aura
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                } after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
                  isActive(link.path) ? 'after:w-full' : 'hover:after:w-full'
                }`}
              >
                {link.icon && <link.icon size={18} />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    isActive(link.path)
                      ? 'text-primary bg-accent'
                      : 'text-foreground hover:text-primary hover:bg-accent/50'
                  }`}
                >
                  {link.icon && <link.icon size={18} />}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
