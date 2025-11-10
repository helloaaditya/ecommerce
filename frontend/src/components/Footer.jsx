import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
  Star,
  Send,
  ChevronUp,
  Heart
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(true);

  const handleNewsletterSubmit = () => {
    // Handle newsletter subscription
    if (email.trim()) {
      console.log('Newsletter subscription:', email);
      setEmail('');
      // You can add success message here
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Features Section */}
      <div className="bg-gradient-to-r from-slate-100 to-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over ₹500</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <RotateCcw className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">SSL encrypted transactions</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Quality</h3>
              <p className="text-gray-600">Premium products guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay in the Loop</h2>
          <p className="text-blue-100 mb-8 text-lg">Get exclusive deals, latest products, and insider news delivered to your inbox</p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
              />
            </div>
            <button
              onClick={handleNewsletterSubmit}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Send className="h-5 w-5" />
              <span>Subscribe</span>
            </button>
          </div>
          
          <p className="text-blue-100 text-sm mt-4">
            Join 50,000+ subscribers. Unsubscribe at any time.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                {/* Gogadgets Logo */}
                <div className="relative mr-3">
                  <svg width="40" height="40" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="23" fill="url(#footer-logo-gradient)" />
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
                    <defs>
                      <linearGradient id="footer-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Gogadgets
                  </h2>
                  <p className="text-xs text-slate-400">Tech & Gadgets Store</p>
                </div>
              </div>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                Your premier destination for the latest tech gadgets and innovative electronics. Discover cutting-edge products that enhance your digital lifestyle.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span>Shadara, Delhi, 110095</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="h-5 w-5 text-green-400" />
                  <span>+91 1234567890</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="h-5 w-5 text-purple-400" />
                  <span>support@gogadgets.live</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/deals" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    Deals
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account & Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Account & Legal</h3>
              <ul className="space-y-3 mb-8">
                <li>
                  <Link to="/profile" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <span className="text-slate-400 text-sm">
                  © 2024 Gogadgets. All rights reserved.
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default Footer;