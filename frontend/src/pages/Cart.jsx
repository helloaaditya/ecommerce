import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usePopup } from '../context/PopupContext';
import { 
  TrashIcon, 
  PlusIcon, 
  MinusIcon, 
  ShoppingBagIcon,
  ArrowLeftIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  SparklesIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { showPopup } = usePopup();
  const [removingItem, setRemovingItem] = useState(null);
  const [updatingQuantity, setUpdatingQuantity] = useState(null);
  const navigate = useNavigate();

  const handleRemoveItem = async (itemId) => {
    setRemovingItem(itemId);
    setTimeout(() => {
      removeFromCart(itemId);
      setRemovingItem(null);
      showPopup('Removed from cart.', 'success');
    }, 300);
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdatingQuantity(itemId);
    updateQuantity(itemId, newQuantity);
    setTimeout(() => {
      setUpdatingQuantity(null);
      showPopup('Updated quantity.', 'success');
    }, 200);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      showPopup('Cart cleared.', 'success');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative flex justify-center items-center min-h-screen px-2 sm:px-6 lg:px-8">
          <div className="text-center max-w-md w-full">
            <div className="relative mb-6 sm:mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl">
                <ShoppingBagIcon className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold">0</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Your cart is empty</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4">
              Looks like you haven't added any items to your cart yet. 
              Start exploring our amazing products!
            </p>
            
            <div className="space-y-3 sm:space-y-4 px-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <ShoppingBagIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Start Shopping
              </Link>
              
              <Link
                to="/deals"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <SparklesIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                View Today's Deals
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/products"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
              >
                <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Continue Shopping</span>
              </Link>
            </div>
            <button
              onClick={handleClearCart}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors font-medium text-sm sm:text-base self-start sm:self-auto"
            >
              <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Clear Cart</span>
            </button>
          </div>
          
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-lg sm:text-xl text-gray-600">
              You have {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {cart.map((item, index) => (
              <div
                key={item._id}
                className={`bg-white rounded-2xl shadow-lg p-4 sm:p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  removingItem === item._id ? 'opacity-50 scale-95' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0 self-center sm:self-auto">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-md">
                      {item.images && item.images[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ShoppingBagIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <Link to={`/products/${item._id}`}>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-3 line-clamp-2 text-sm sm:text-base">
                      {item.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-xl sm:text-2xl font-bold text-gray-900">
                          ${item.price}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-xl p-2">
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 ${
                          item.quantity <= 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-md'
                        }`}
                      >
                        <MinusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                      <span className={`w-8 sm:w-12 text-center font-bold text-base sm:text-lg ${
                        updatingQuantity === item._id ? 'animate-pulse' : ''
                      }`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                        className="p-1.5 sm:p-2 rounded-lg text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-md transition-all duration-200"
                      >
                        <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-base sm:text-lg font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        ${item.price} each
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="p-2 sm:p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 self-center sm:self-auto"
                  >
                    <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 sticky top-4 sm:top-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h2>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Subtotal ({cart.length} items)</span>
                  <span className="font-bold text-base sm:text-lg">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Shipping</span>
                  <span className="font-bold text-green-600 text-sm sm:text-base">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Tax</span>
                  <span className="font-bold text-sm sm:text-base">${(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">Total</span>
                    <span className="text-xl sm:text-2xl font-bold text-blue-600">
                      ${(getCartTotal() * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <ShieldCheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <span className="font-semibold text-green-800 text-sm sm:text-base">Secure Checkout</span>
                </div>
                <p className="text-xs sm:text-sm text-green-700">
                  Your payment information is encrypted and secure
                </p>
              </div>

              <button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mb-3 sm:mb-4"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>

              <div className="text-center">
                <Link
                  to="/products"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm sm:text-base"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 