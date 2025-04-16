
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Info, 
  Mail, 
  LineChart, 
  Menu, 
  X, 
  LogIn, 
  LogOut,
  User
} from 'lucide-react';

export const Navbar = () => {
  const router = useRouter();
  const { state, logout } = useAuth();
  const { isAuthenticated, user } = state;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-card fixed w-full z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-crypto-teal to-crypto-blue flex items-center justify-center">
                <LineChart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">CryptoPredict</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className={`flex items-center space-x-1 text-foreground/80 hover:text-foreground py-2 px-3 rounded-md hover:bg-muted/40 transition-colors ${router.pathname === '/' ? 'text-foreground bg-muted/30' : ''}`}>
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/about" className={`flex items-center space-x-1 text-foreground/80 hover:text-foreground py-2 px-3 rounded-md hover:bg-muted/40 transition-colors ${router.pathname === '/about' ? 'text-foreground bg-muted/30' : ''}`}>
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link href="/contact" className={`flex items-center space-x-1 text-foreground/80 hover:text-foreground py-2 px-3 rounded-md hover:bg-muted/40 transition-colors ${router.pathname === '/contact' ? 'text-foreground bg-muted/30' : ''}`}>
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className={`flex items-center space-x-1 text-foreground/80 hover:text-foreground py-2 px-3 rounded-md hover:bg-muted/40 transition-colors ${router.pathname === '/dashboard' ? 'text-foreground bg-muted/30' : ''}`}>
                <LineChart className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground mr-2">
                  Hi, {user?.name}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <LogIn className="h-4 w-4 mr-1" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="flex items-center space-x-1">
                    <User className="h-4 w-4 mr-1" />
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted/40 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border/20">
            <Link href="/" className={`flex items-center space-x-2 text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md hover:bg-muted/40 ${router.pathname === '/' ? 'text-foreground bg-muted/30' : ''}`} onClick={toggleMenu}>
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link href="/about" className={`flex items-center space-x-2 text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md hover:bg-muted/40 ${router.pathname === '/about' ? 'text-foreground bg-muted/30' : ''}`} onClick={toggleMenu}>
              <Info className="h-5 w-5" />
              <span>About</span>
            </Link>
            <Link href="/contact" className={`flex items-center space-x-2 text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md hover:bg-muted/40 ${router.pathname === '/contact' ? 'text-foreground bg-muted/30' : ''}`} onClick={toggleMenu}>
              <Mail className="h-5 w-5" />
              <span>Contact</span>
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className={`flex items-center space-x-2 text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md hover:bg-muted/40 ${router.pathname === '/dashboard' ? 'text-foreground bg-muted/30' : ''}`} onClick={toggleMenu}>
                <LineChart className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="flex items-center space-x-2 text-foreground/80 hover:text-foreground w-full text-left px-3 py-2 rounded-md hover:bg-muted/40"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link href="/login" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md hover:bg-muted/40" onClick={toggleMenu}>
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link href="/register" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md hover:bg-muted/40" onClick={toggleMenu}>
                  <User className="h-5 w-5" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
