import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
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
  Play
} from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const { addToCart } = useCart();

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

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Globe, value: '100+', label: 'Countries Served' },
    { icon: Award, value: '10K+', label: 'Products Available' },
    { icon: Clock, value: '24/7', label: 'Customer Support' }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure payment processing',
      color: 'green'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Same day delivery available',
      color: 'purple'
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Curated selection of premium products',
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center text-white py-32 overflow-hidden" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop')`
      }}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                Premium Shopping Experience
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  ShopHub
                </span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                Discover amazing products at unbeatable prices. Your one-stop destination for premium shopping.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center"
                >
                  <span>Start Shopping</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white/5 rounded-xl">
                      <stat.icon className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-blue-100">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Explore our wide range of products</p>
          </div>
          
          {categoryLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="aspect-square">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold mb-1">{category.name}</h3>
                      <p className="text-blue-200 text-sm">{category.count || 0} products</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-10 bg-white rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-xl text-gray-600">Handpicked products for you</p>
            </div>
            <Link
              to="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div key={product._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                  <div className="relative">
                    <div className="aspect-square bg-gray-200 overflow-hidden">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <Heart className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.ratings || 0) ? 'fill-current' : 'fill-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        ({product.numOfReviews || 0})
                      </span>
                    </div>
                    
                    <Link to={`/products/${product._id}`}>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                        {product.stock > 0 && (
                          <span className="text-sm text-green-600 ml-2">
                            In Stock
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real reviews from real customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;