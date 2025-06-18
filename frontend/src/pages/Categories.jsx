import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ShoppingBagIcon, 
  SparklesIcon,
  ArrowRightIcon,
  StarIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/products/categories');
      const categoriesData = response.data.data || [];
      
      // Map categories with relevant default images
      const categoriesWithImages = categoriesData.map((category) => {
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
          image: defaultImages[category.name] || defaultImages['Other'],
          trending: category.count > 100 // Mark as trending if more than 100 products
        };
      });
      
      setCategories(categoriesWithImages);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback categories
      setCategories([
        { name: 'Electronics', count: 0, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop' },
        { name: 'Clothing', count: 0, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' },
        { name: 'Home', count: 0, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
        { name: 'Sports', count: 0, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('/products?limit=6');
      setFeaturedProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'trending' && category.trending) ||
                         (activeFilter === 'popular' && category.count > 50);
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-border mx-auto mb-6"></div>
            <div className="absolute inset-2 bg-slate-900 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <p className="text-white text-xl font-semibold">Curating Categories</p>
            <p className="text-purple-300">Preparing your shopping experience...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6">
              <SparklesIcon className="h-5 w-5 text-orange-400 mr-2" />
              <span className="text-white font-medium">Trending Now</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
              Discover
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Amazing Products
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Explore curated collections across multiple categories, 
              each designed to inspire and delight
            </p>

            {/* Search and Filter Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
                <div className="relative flex-1 max-w-md">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="flex bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-1">
                  {['all', 'trending', 'popular'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 capitalize ${
                        activeFilter === filter
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {filter}
                      {filter === 'trending' && <SparklesIcon className="inline h-4 w-4 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Categories Grid */}
        <div className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCategories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="group relative cursor-pointer block"
              >
                <div className={`
                  relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden
                  transition-all duration-500 transform hover:scale-105 hover:rotate-1
                  ${hoveredCategory === index ? 'shadow-2xl shadow-purple-500/25' : 'shadow-lg'}
                `}>
                  {/* Trending Badge */}
                  {category.trending && (
                    <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <SparklesIcon className="h-3 w-3 mr-1" />
                      HOT
                    </div>
                  )}

                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Hover Overlay */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent
                      transition-opacity duration-300
                      ${hoveredCategory === index ? 'opacity-100' : 'opacity-0'}
                    `}></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                      <ArrowRightIcon className={`
                        h-6 w-6 text-white transition-all duration-300
                        ${hoveredCategory === index ? 'translate-x-2 text-purple-300' : ''}
                      `} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-purple-200 text-lg font-medium">{category.count} products</p>
                      <div className={`
                        w-2 h-2 rounded-full transition-all duration-300
                        ${category.trending ? 'bg-orange-400 animate-pulse' : 'bg-slate-400'}
                      `}></div>
                    </div>
                    
                    {/* Progress bar for visual appeal */}
                    <div className="mt-3 w-full bg-white/20 rounded-full h-1">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((category.count / 250) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Featured Products</h2>
              <p className="text-xl text-slate-300">Handpicked products from various categories</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="aspect-square bg-gray-200 overflow-hidden">
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ShoppingBagIcon className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.ratings || 0) ? 'fill-current' : 'fill-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-400 ml-2">
                        ({product.numOfReviews || 0})
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">
                        ${product.price}
                      </span>
                      <span className="text-sm text-slate-400">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h3>
            <p className="text-xl text-purple-100 mb-8">
              Explore our complete product catalog with thousands of items
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse All Products
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;