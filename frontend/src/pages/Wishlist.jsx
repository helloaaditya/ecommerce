import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { 
  HeartIcon, 
  ShoppingBagIcon,
  TrashIcon,
  EyeIcon,
  StarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      clearWishlist();
    }
  };

  const getWishlistTotal = () => {
    return wishlist.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartIcon className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">My Wishlist</h1>
            <p className="text-xl text-red-100">Save your favorite products for later</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Wishlist Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{wishlist.length}</div>
            <div className="text-gray-600">Wishlist Items</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              ${getWishlistTotal().toFixed(2)}
            </div>
            <div className="text-gray-600">Total Value</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {wishlist.filter(item => item.stock > 0).length}
            </div>
            <div className="text-gray-600">In Stock</div>
          </div>
        </div>

        {/* Actions */}
        {wishlist.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <button
                onClick={handleClearWishlist}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <TrashIcon className="h-4 w-4" />
                <span>Clear Wishlist</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-5 w-5 text-yellow-500" />
              <span className="text-gray-600">Save up to 20% on wishlist items!</span>
            </div>
          </div>
        )}

        {/* Wishlist Items */}
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 max-w-md mx-auto shadow-lg">
              <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Start adding products you love to your wishlist!</p>
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
            {wishlist.map((product) => (
              <div key={product._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
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
                        <ShoppingBagIcon className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg"
                    >
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </button>
                    <Link
                      to={`/products/${product._id}`}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg"
                    >
                      <EyeIcon className="h-4 w-4 text-gray-600" />
                    </Link>
                  </div>

                  {/* Stock Badge */}
                  {product.stock === 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Wishlist Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <HeartSolid className="h-3 w-3 mr-1" />
                      Saved
                    </span>
                  </div>
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
                    <span className="text-sm text-gray-500 ml-2">
                      ({product.numOfReviews || 0})
                    </span>
                  </div>
                  
                  <Link to={`/products/${product._id}`}>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.stock > 0 && (
                        <span className="text-sm text-green-600 ml-2 font-medium">
                          In Stock
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingBagIcon className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {wishlist.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to purchase?</h3>
              <p className="text-xl text-red-100 mb-8">
                Add all items to cart and enjoy free shipping on orders over $50!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => wishlist.forEach(product => addToCart(product, 1))}
                  className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span>Add All to Cart</span>
                </button>
                <Link
                  to="/products"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist; 