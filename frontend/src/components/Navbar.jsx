import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Heart, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();
  
  // Get real counts from contexts
  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Navigate to products page with search query
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearching(false);
      setIsMenuOpen(false);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-slate-700">
      {/* Top Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>Free shipping on orders over $50</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <span>📞 +91 1234569870</span>
              <span>✉️ support@gogadgets.live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer group">
              {/* Gogadgets Logo - Two overlapping G's */}
              <div className="relative mr-3 group-hover:scale-105 transition-transform duration-200">
                <svg width="48" height="48" viewBox="0 0 48 48" className="drop-shadow-lg">
                  {/* Background circle */}
                  <circle cx="24" cy="24" r="23" fill="url(#logo-gradient)" />
                  
                  {/* First G (left) */}
                  <text 
                    x="14" 
                    y="32" 
                    fontFamily="Arial, sans-serif" 
                    fontSize="24" 
                    fontWeight="bold" 
                    fill="white"
                    opacity="0.9"
                  >
                    G
                  </text>
                  
                  {/* Second G (right, overlapping) */}
                  <text 
                    x="22" 
                    y="32" 
                    fontFamily="Arial, sans-serif" 
                    fontSize="24" 
                    fontWeight="bold" 
                    fill="white"
                  >
                    G
                  </text>
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Gogadgets
                </h1>
                <p className="text-xs text-slate-400 -mt-1">Tech & Gadgets Store</p>
              </div>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                placeholder="Search products, brands, categories..."
                className="w-full pl-12 pr-12 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                disabled={isSearching}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <button
                type="submit"
                disabled={!searchQuery.trim() || isSearching}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white p-1.5 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </button>
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-blue-400 font-medium transition-colors duration-200 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link to="/products" className="text-white hover:text-blue-400 font-medium transition-colors duration-200 relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link to="/categories" className="text-white hover:text-blue-400 font-medium transition-colors duration-200 relative group">
              Categories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link to="/deals" className="text-white hover:text-blue-400 font-medium transition-colors duration-200 relative group">
              Deals
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-200"></span>
            </Link>
            {isAuthenticated && isAdmin && (
              <Link to="/admin" className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200 relative group">
                Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-200"></span>
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart */}
            <Link to="/cart" className="relative p-2 text-slate-300 hover:text-green-400 transition-colors duration-200 group ml-6">
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

             {/* User Menu */}
             {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 px-4 py-2 rounded-xl transition-all duration-200 group border border-slate-600"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-white text-sm font-medium">{user?.name}</p>
                    <p className="text-slate-400 text-xs">Premium Member</p>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-slate-800 rounded-2xl shadow-2xl py-2 z-50 border border-slate-600">
                    <div className="px-4 py-3 border-b border-slate-700">
                      <p className="text-white font-medium">{user?.name}</p>
                      <p className="text-slate-400 text-sm">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link to="/profile" className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200">
                        <User className="h-4 w-4 mr-3" />
                        My Profile
                      </Link>
                      <Link to="/orders" className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200">
                        <ShoppingCart className="h-4 w-4 mr-3" />
                        My Orders
                      </Link>
                      <Link to="/wishlist" className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200">
                        <Heart className="h-4 w-4 mr-3" />
                        Wishlist
                      </Link>
                    </div>
                    <div className="border-t border-slate-700 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              placeholder="Search products..."
              className="w-full pl-12 pr-12 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={isSearching}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <button
              type="submit"
              disabled={!searchQuery.trim() || isSearching}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white p-1.5 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Search className="h-4 w-4" />
              )}
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-slate-800 rounded-2xl mt-4 p-4 border border-slate-600">
            <div className="space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                to="/categories"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Categories
              </Link>
              <Link
                to="/deals"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Deals
              </Link>
              {isAuthenticated && isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200"
                >
                  Admin
                </Link>
              )}
              
              {!isAuthenticated && (
                <div className="pt-4 border-t border-slate-700 space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-slate-300 hover:text-white font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;