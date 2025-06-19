import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Heart, MapPin, LogOut, LogIn, UserPlus, Home as HomeIcon, List, Tag } from 'lucide-react';
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
  
  // Refs for dropdown and button
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);

  // Close user menu on outside click or scroll
  useEffect(() => {
    if (!isUserMenuOpen) return;
    function handleClickOrScroll(e) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOrScroll);
    window.addEventListener('scroll', handleClickOrScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOrScroll);
      window.removeEventListener('scroll', handleClickOrScroll);
    };
  }, [isUserMenuOpen]);

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

  // Helper: Navigation links for dropdown
  const navLinks = [
    { to: '/', label: 'Home', icon: <HomeIcon className="h-5 w-5 mr-2" /> },
    { to: '/products', label: 'Products', icon: <List className="h-5 w-5 mr-2" /> },
    { to: '/categories', label: 'Categories', icon: <Tag className="h-5 w-5 mr-2" /> },
    { to: '/deals', label: 'Deals', icon: <Tag className="h-5 w-5 mr-2" /> },
    { to: '/wishlist', label: 'Wishlist', icon: <Heart className="h-5 w-5 mr-2" /> },
    { to: '/cart', label: 'Cart', icon: <ShoppingCart className="h-5 w-5 mr-2" /> },
  ];

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
              <span>📞 +91 8797223004</span>
              <span>✉️ support@shophub.com</span>
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
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl mr-3 group-hover:scale-105 transition-transform duration-200">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">S</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ShopHub
                </h1>
                <p className="text-xs text-slate-400 -mt-1">Premium Shopping</p>
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
          <div className="flex items-center ml-auto">
            {/* Desktop: Wishlist and Cart */}
            <div className="hidden lg:flex items-center space-x-2 mr-2">
              <Link to="/wishlist" className="relative p-2 text-slate-300 hover:text-red-400 transition-colors duration-200 group">
                <Heart className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative p-2 text-slate-300 hover:text-green-400 transition-colors duration-200 group">
                <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
            {/* Desktop: Profile/User Icon and Dropdown (original) */}
            <div className="hidden lg:block relative">
              <button
                ref={userButtonRef}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 px-4 py-2 rounded-xl transition-all duration-200 group border border-slate-600"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-medium">{user?.name}</p>
                  <p className="text-slate-400 text-xs">Premium Member</p>
                </div>
              </button>
              {isUserMenuOpen && (
                <div
                  ref={userMenuRef}
                  className="absolute right-0 mt-3 w-64 bg-slate-800 rounded-2xl shadow-2xl py-2 z-50 border border-slate-600"
                >
                  {isAuthenticated && (
                    <div className="px-4 py-3 border-b border-slate-700">
                      <p className="text-white font-medium">{user?.name}</p>
                      <p className="text-slate-400 text-sm">{user?.email}</p>
                    </div>
                  )}
                  <div className="py-2">
                    <Link to="/profile" className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200" onClick={() => setIsUserMenuOpen(false)}>
                      <User className="h-4 w-4 mr-3" />My Profile
                    </Link>
                    <Link to="/orders" className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200" onClick={() => setIsUserMenuOpen(false)}>
                      <ShoppingCart className="h-4 w-4 mr-3" />My Orders
                    </Link>
                    <Link to="/wishlist" className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200" onClick={() => setIsUserMenuOpen(false)}>
                      <Heart className="h-4 w-4 mr-3" />Wishlist
                    </Link>
                  </div>
                  <div className="border-t border-slate-700 pt-2">
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-slate-700 hover:text-white transition-colors duration-200">
                      <LogOut className="h-4 w-4 mr-3" />Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Mobile: Only profile/user icon, all navigation in dropdown */}
            <div className="block lg:hidden relative">
              <button
                ref={userButtonRef}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 px-4 py-2 rounded-xl transition-all duration-200 group border border-slate-600"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </button>
              {isUserMenuOpen && (
                <div
                  ref={userMenuRef}
                  className="absolute right-0 mt-3 w-72 max-w-xs bg-slate-800 rounded-2xl shadow-2xl py-2 z-50 border border-slate-600"
                >
                  {isAuthenticated && (
                    <div className="px-4 py-3 border-b border-slate-700 flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{user?.name}</p>
                        <p className="text-slate-400 text-sm">{user?.email}</p>
                      </div>
                    </div>
                  )}
                  <div className="py-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    ))}
                    {isAuthenticated && isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-orange-400 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-5 w-5 mr-2" />Admin
                      </Link>
                    )}
                    {!isAuthenticated && (
                      <>
                        <Link
                          to="/login"
                          className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LogIn className="h-5 w-5 mr-2" />Login
                        </Link>
                        <Link
                          to="/register"
                          className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserPlus className="h-5 w-5 mr-2" />Register
                        </Link>
                      </>
                    )}
                    {isAuthenticated && (
                      <>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="h-5 w-5 mr-2" />My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <ShoppingCart className="h-5 w-5 mr-2" />My Orders
                        </Link>
                        <button
                          onClick={() => { handleLogout(); setIsUserMenuOpen(false); }}
                          className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                        >
                          <LogOut className="h-5 w-5 mr-2" />Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
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

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 bg-slate-900 rounded-xl shadow-xl py-4 px-6 space-y-4 z-40">
            <Link to="/" className="block text-white hover:text-blue-400 font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="block text-white hover:text-blue-400 font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link to="/categories" className="block text-white hover:text-blue-400 font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
              Categories
            </Link>
            <Link to="/deals" className="block text-white hover:text-blue-400 font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
              Deals
            </Link>
            {isAuthenticated && isAdmin && (
              <Link to="/admin" className="block text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                Admin
              </Link>
            )}
            <Link to="/wishlist" className="block text-white hover:text-red-400 font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
              Wishlist
            </Link>
            <Link to="/cart" className="block text-white hover:text-green-400 font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
              Cart
            </Link>
            {!isAuthenticated && (
              <>
                <Link to="/login" className="block text-white hover:text-blue-400 font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block text-white hover:text-blue-400 font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Link to="/profile" className="block text-white hover:text-blue-400 font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                  My Profile
                </Link>
                <Link to="/orders" className="block text-white hover:text-blue-400 font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                  My Orders
                </Link>
                <button onClick={handleLogout} className="block w-full text-left text-red-400 hover:text-red-300 font-medium transition-colors duration-200 mt-2">
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;