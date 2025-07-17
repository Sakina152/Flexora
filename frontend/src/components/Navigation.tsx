
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Heart, X, ShoppingCart } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu';
import { User } from 'lucide-react';
import { useAuth } from '../App';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [lookbookPersona, setLookbookPersona] = useState<string | null>(null);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('flexora-cart') || '[]');
      setCartCount(cart.reduce((sum, item) => sum + (item.quantity || 1), 0));
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cart-updated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  // Lookbook persona from localStorage
  useEffect(() => {
    setLookbookPersona(localStorage.getItem('flexora-last-persona'));
    const onStorage = () => setLookbookPersona(localStorage.getItem('flexora-last-persona'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Trending', path: '/trending-looks' },
    { name: 'Categories', path: '/style-categories' },
    { name: 'Spotlights', path: '/student-spotlights' },
    { name: 'Collections', path: '/collections' },
    { name: 'Products', path: '/products' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Lookbook Button */}
              {lookbookPersona ? (
                <NavLink
                  to={`/lookbook/${lookbookPersona}`}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200 flex items-center gap-1 ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-accent-foreground hover:text-primary hover:bg-accent'
                    }`
                  }
                >
                  <span role="img" aria-label="lookbook">✨</span> Your Lookbook
                </NavLink>
              ) : (
                <NavLink
                  to="/quiz"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200 flex items-center gap-1 ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-accent-foreground hover:text-primary hover:bg-accent'
                    }`
                  }
                >
                  <span role="img" aria-label="quiz">📝</span> Take the Quiz
                </NavLink>
              )}

              {/* Favorites Heart Icon */}
              <div className="flex items-center gap-2 align-middle h-full">
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`
                  }
                  aria-label="Favorites"
                >
                  <Heart className="w-5 h-5" />
                </NavLink>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `relative flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`
                  }
                  aria-label="Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center border border-background shadow">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </div>
              {/* Account Avatar Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="ml-4 cursor-pointer">
                    <Avatar>
                      <AvatarFallback>
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user ? (
                    <>
                      <DropdownMenuItem disabled>Signed in as  <b>{user.username}</b></DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <NavLink to="/login">Login</NavLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <NavLink to="/signup">Sign Up</NavLink>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            {/* Lookbook Button Mobile */}
            {lookbookPersona ? (
              <NavLink
                to={`/lookbook/${lookbookPersona}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-semibold transition-colors duration-200 flex items-center gap-1 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-accent-foreground hover:text-primary hover:bg-accent'
                  }`
                }
              >
                <span role="img" aria-label="lookbook">✨</span> Your Lookbook
              </NavLink>
            ) : (
              <NavLink
                to="/quiz"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-semibold transition-colors duration-200 flex items-center gap-1 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-accent-foreground hover:text-primary hover:bg-accent'
                  }`
                }
              >
                <span role="img" aria-label="quiz">📝</span> Take the Quiz
              </NavLink>
            )}
            {/* Mobile Favorites and Cart Links */}
            <div className="flex items-center gap-2">
              <NavLink
                to="/favorites"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`
                }
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5" />
                Favorites
              </NavLink>
              <NavLink
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`
                }
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                Cart
              </NavLink>
            </div>
            {/* Mobile Account Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="ml-4 cursor-pointer">
                  <Avatar>
                    <AvatarFallback>
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuItem disabled>Signed in as <b>{user.username}</b></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <NavLink to="/login">Login</NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink to="/signup">Sign Up</NavLink>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;