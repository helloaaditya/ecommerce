import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  ShoppingCart, 
  Star, 
  Heart, 
  ArrowRight, 
  Truck, 
  Shield, 
  Clock, 
  Sparkles,
  TrendingUp,
  Award,
  Users,
  Globe,
  Zap,
  CheckCircle,
  Play,
  ShoppingBag,
  Gift,
  Tag,
  Percent,
  ArrowUpRight
} from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth ? useAuth() : { user: null };
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });
  const heroRef = useRef(null);

  const animatedTexts = [
    "Premium Shopping Experience",
    "Unbeatable Prices & Quality",
    "Fast & Secure Delivery",
    "24/7 Customer Support"
  ];

  // Auto-changing text animation (separate effect for reliability)
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 3000);
    return () => clearInterval(textInterval);
  }, [animatedTexts.length]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/products?limit=8');
      setFeaturedProducts(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);
      const response = await axios.get('/products/categories');
      const categoriesData = response.data.data || [];
      
      // Map categories with relevant default images
      const categoriesWithImages = categoriesData.map((category, index) => {
        const defaultImages = {
          'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
          'Clothing': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
          'Fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
          'Home': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
          'Home & Garden': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
          'Sports': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
          'Books': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
          'Beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
          'Health': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
          'Toys': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
          'Automotive': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
          'Garden': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
          'Kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
          'Office': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
          'Pet Supplies': 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop',
          'Baby': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=300&fit=crop',
          'Jewelry': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
          'Shoes': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
          'Bags': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
          'Watches': 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
          'Other': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
        };
        
        return {
          ...category,
          image: defaultImages[category.name] || defaultImages['Other']
        };
      });
      
      setCategories(categoriesWithImages);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to default categories if API fails
      setCategories([
        { name: 'Electronics', count: 0, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop' },
        { name: 'Clothing', count: 0, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' },
        { name: 'Home', count: 0, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
        { name: 'Sports', count: 0, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' }
      ]);
    } finally {
      setCategoryLoading(false);
    }
  };

  // Popup close handler
  const closePopup = () => setPopup({ ...popup, show: false });

  // Show popup for 2.5s
  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => setPopup({ ...popup, show: false }), 2500);
      return () => clearTimeout(timer);
    }
  }, [popup.show]);

  // Add to Cart handler
  const handleAddToCart = (product) => {
    if (user) {
      addToCart(product, 1);
      setPopup({ show: true, message: 'Added to cart!', type: 'success' });
    } else {
      setPopup({ show: true, message: 'Please log in to add to cart.', type: 'login' });
    }
  };

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers', color: 'from-blue-500 to-cyan-500' },
    { icon: Globe, value: '100+', label: 'Countries Served', color: 'from-green-500 to-emerald-500' },
    { icon: Award, value: '10K+', label: 'Products Available', color: 'from-purple-500 to-pink-500' },
    { icon: Clock, value: '24/7', label: 'Customer Support', color: 'from-orange-500 to-red-500' }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure payment processing',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Same day delivery available',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Curated selection of premium products',
      color: 'orange',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let animationFrame;
      let startTime = null;
      function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      }
      animationFrame = requestAnimationFrame(animate);
      return () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
      };
    }, []);
    return <span>{count}</span>;
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative py-8 bg-slate-900 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(20,20,30,0.65),rgba(20,20,30,0.85)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-xl animate-pulse delay-3000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Animated Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/20 animate-pulse">
                <Sparkles className="h-5 w-5 mr-3 text-yellow-300 animate-spin" />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-bold">
                  {animatedTexts[currentTextIndex]}
                </span>
              </div>

              {/* Main Heading with Gradient */}
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black mb-6 md:mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  Welcome to{' '}
                </span>
                <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 bg-clip-text text-transparent animate-pulse">
                  ShopHub
                </span>
              </h1>

              {/* Animated Subtitle */}
              <p className="text-base md:text-xl lg:text-2xl mb-8 md:mb-12 text-blue-100 leading-relaxed font-light">
                Discover amazing products at{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-bold">
                  unbeatable prices
                </span>
                . Your one-stop destination for premium shopping.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-md mx-auto sm:max-w-none sm:mx-0">
                <Link
                  to="/products"
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full sm:w-auto px-6 py-3 md:px-10 md:py-5 rounded-2xl font-bold text-lg md:text-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Shopping
                    <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <button className="group relative border-2 border-white/30 text-white w-full sm:w-auto px-6 py-3 md:px-10 md:py-5 rounded-2xl font-bold text-lg md:text-xl hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                  <Play className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center mt-12 space-x-8">
                <div className="flex items-center text-blue-200">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  <span className="text-sm">Trusted by 50K+ customers</span>
                </div>
                <div className="flex items-center text-blue-200">
                  <Shield className="h-5 w-5 mr-2 text-green-400" />
                  <span className="text-sm">100% Secure</span>
                </div>
              </div>
            </div>

            {/* Interactive Stats Grid */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div 
                      key={index} 
                      className="group text-center p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 hover:from-white/10 hover:to-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-blue-200 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section with Hover Effects */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3 md:mb-6">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopHub?
              </span>
            </h2>
            <p className="text-sm md:text-xl text-slate-600 max-w-3xl mx-auto mb-4 md:mb-0">
              Experience the difference with our premium features designed to make your shopping journey seamless and enjoyable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-slate-100 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section with Enhanced Animations */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3 md:mb-6">
              Shop by{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <p className="text-sm md:text-xl text-slate-600 mb-4 md:mb-0">Explore our wide range of products across various categories</p>
          </div>
          
          {categoryLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-square relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
                    
                    {/* Floating Icons */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <ArrowUpRight className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-blue-200 text-sm font-medium">
                        {category.count || 0} products available
                      </p>
                      
                      {/* Animated Border */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section with Enhanced Cards */}
      <section className="py-10 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-8 md:mb-16">
            <h2 className="text-4xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-0 truncate whitespace-nowrap">
              Featured{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <Link
              to="/products"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white w-auto px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold text-base md:text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mb-0"
            >
              View All
              <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product._id} 
                  className="group bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-4 border border-slate-100 overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="aspect-square bg-slate-200 overflow-hidden">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-t-2xl md:rounded-t-3xl"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <ShoppingBag className="h-12 w-12" />
                        </div>
                      )}
                    </div>
                    
                    {/* Floating Action Buttons */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2">
                      <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                        <Heart className="h-5 w-5 text-slate-600 hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                    
                    {/* Discount Badge */}
                    {product.price > 100 && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                        <Percent className="h-3 w-3 mr-1" />
                        SALE
                      </div>
                    )}
                    
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 md:p-6 flex flex-col flex-1">
                    <div className="flex items-center mb-2 md:mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.ratings || 0) ? 'fill-current' : 'fill-slate-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs md:text-sm text-slate-500 ml-2">
                        ({product.numOfReviews || 0})
                      </span>
                    </div>
                    
                    <Link to={`/products/${product._id}`}>
                      <h3 className="font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 text-base md:text-lg">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-slate-600 text-xs md:text-sm mb-2 md:mb-6 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-xl md:text-3xl font-black text-slate-900">
                          ${product.price}
                        </span>
                        {product.stock > 0 && (
                          <span className="text-xs md:text-sm text-green-600 ml-2 font-medium flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            In Stock
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 md:p-4 rounded-xl md:rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              What Our{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Customers Say
              </span>
            </h2>
            <p className="text-xl text-blue-100">Real reviews from real customers</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            {[
              {
                name: 'Priya Sharma',
                role: 'Verified Buyer',
                content: 'Amazing quality products and fast delivery. ShopHub has become my go-to shopping destination!',
                rating: 5,
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
              },
              {
                name: 'Rajesh Kumar',
                role: 'Premium Member',
                content: 'The customer service is exceptional and the product selection is incredible. Highly recommended!',
                rating: 5,
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
              },
              {
                name: 'Anjali Patel',
                role: 'Loyal Customer',
                content: 'I love the premium quality and competitive prices. ShopHub never disappoints!',
                rating: 5,
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="group bg-white/10 backdrop-blur-md p-4 md:p-8 rounded-2xl md:rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2"
              >
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-blue-100 mb-4 md:mb-8 italic text-sm md:text-lg leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full mr-3 md:mr-4 ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300"
                  />
                  <div>
                    <div className="font-bold text-white text-base md:text-lg">{testimonial.name}</div>
                    <div className="text-blue-200 text-xs md:text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup Notification */}
      {popup.show && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg flex items-center space-x-2
          ${popup.type === 'success' ? 'bg-green-600 text-white' : 'bg-yellow-500 text-white'}`}
        >
          <span>{popup.message}</span>
          <button onClick={closePopup} className="ml-2 text-lg font-bold focus:outline-none">&times;</button>
        </div>
      )}
    </div>
  );
};

export default Home;