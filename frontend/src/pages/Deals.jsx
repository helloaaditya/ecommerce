import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ShoppingBagIcon, 
  SparklesIcon,
  ArrowRightIcon,
  StarIcon,
  ClockIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      // Fetch all products from the database
      const response = await axios.get('/products');
      const allProducts = response.data.data || [];
      
      // Create deals by adding discount properties to products
      // In a real app, you'd have a separate deals/discounts collection
      const dealsWithDiscounts = allProducts.map((product) => {
        // Generate random discount between 10-50%
        const discount = Math.floor(Math.random() * 40) + 10;
        const originalPrice = product.price * (1 + discount / 100);
        
        return {
          ...product,
          originalPrice: parseFloat(originalPrice.toFixed(2)),
          discount: discount,
          dealEnds: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time within 7 days
          dealType: ['flash', 'daily', 'weekly'][Math.floor(Math.random() * 3)]
        };
      });
      
      setDeals(dealsWithDiscounts);
    } catch (error) {
      console.error('Error fetching deals:', error);
      setDeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const filteredDeals = deals.filter(deal => {
    if (activeTab === 'all') return true;
    return deal.dealType === activeTab;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <SparklesIcon className="h-12 w-12 text-yellow-300 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Hot Deals
              </h1>
              <SparklesIcon className="h-12 w-12 text-yellow-300 ml-4" />
            </div>
            <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
              Limited time offers on amazing products. Don't miss out!
            </p>
            <div className="flex items-center justify-center space-x-4">
              <SparklesIcon className="h-8 w-8 text-yellow-300" />
              <span className="text-lg">Up to 50% off on selected items</span>
              <SparklesIcon className="h-8 w-8 text-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Deal Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'all', name: 'All Deals', icon: TagIcon },
              { id: 'flash', name: 'Flash Sales', icon: SparklesIcon },
              { id: 'daily', name: 'Daily Deals', icon: ClockIcon },
              { id: 'weekly', name: 'Weekly Offers', icon: SparklesIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        {filteredDeals.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 max-w-md mx-auto shadow-lg">
              <SparklesIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No deals available</h3>
              <p className="text-gray-600 mb-6">Check back later for amazing offers!</p>
              <Link
                to="/products"
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDeals.map((deal) => (
              <div key={deal._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative">
                  <div className="aspect-square bg-gray-200 overflow-hidden">
                    {deal.images && deal.images[0] ? (
                      <img
                        src={deal.images[0]}
                        alt={deal.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ShoppingBagIcon className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{deal.discount}%
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleWishlistToggle(deal)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg"
                  >
                    {isInWishlist(deal._id) ? (
                      <HeartSolid className="h-5 w-5 text-red-500" />
                    ) : (
                      <SparklesIcon className="h-5 w-5 text-gray-600" />
                    )}
                  </button>

                  {/* Time Remaining */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2 text-white text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <ClockIcon className="h-4 w-4" />
                        <span className="text-sm font-semibold">
                          {getTimeRemaining(deal.dealEnds)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(deal.ratings || 0) ? 'fill-current' : 'fill-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      ({deal.numOfReviews || 0})
                    </span>
                  </div>
                  
                  <Link to={`/products/${deal._id}`}>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                      {deal.name}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {deal.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-red-600">
                        ${deal.price}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ${deal.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-green-600 font-semibold">
                      You save ${(deal.originalPrice - deal.price).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {deal.category}
                    </span>
                    
                    <button
                      onClick={() => handleAddToCart(deal)}
                      disabled={deal.stock === 0}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                      <ShoppingBagIcon className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Deals; 