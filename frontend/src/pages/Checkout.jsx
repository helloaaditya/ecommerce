import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const paymentOptions = [
  { value: 'cod', label: 'Cash on Delivery' },
  { value: 'card', label: 'Credit/Debit Card' },
  { value: 'upi', label: 'UPI' },
  { value: 'paypal', label: 'PayPal' },
];

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({
    name: user?.name || '',
    address: user?.address || '',
    phone: user?.phone || '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Payment gateway logic placeholder
      if (paymentMethod !== 'cod') {
        alert('Payment gateway integration coming soon!');
        setLoading(false);
        return;
      }
      const orderData = {
        items: cart.map(item => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images?.[0] || '',
        })),
        shippingAddress: shipping.address,
        phone: shipping.phone,
        paymentMethod,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };
      await axios.post('/orders', orderData);
      clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = cartTotal * 0.1;
  const grandTotal = cartTotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-slate-100">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Secure Checkout</h1>
          <p className="text-center text-gray-500 mb-4">Complete your order in just a few steps. All transactions are SSL encrypted and 100% secure.</p>
          {error && <div className="text-red-600 text-center bg-red-50 border border-red-200 rounded-xl py-2 px-4">{error}</div>}
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={shipping.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-200"
              required
            />
            <input
              type="text"
              name="address"
              value={shipping.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-200"
              required
            />
            <input
              type="tel"
              name="phone"
              value={shipping.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block font-semibold mb-2 text-gray-700">Payment Method</label>
            <div className="grid grid-cols-1 gap-3">
              {paymentOptions.map(option => (
                <label key={option.value} className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-200 ${paymentMethod === option.value ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.value}
                    checked={paymentMethod === option.value}
                    onChange={() => setPaymentMethod(option.value)}
                    className="mr-3 accent-blue-600"
                  />
                  <span className="font-medium text-gray-800">{option.label}</span>
                  {option.value !== 'cod' && (
                    <span className="ml-2 text-xs text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full">Coming Soon</span>
                  )}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
            <p className="text-xs text-gray-400 mt-2">By placing your order, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.</p>
          </div>
          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-xs text-gray-600 font-semibold">SSL Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
              <span className="text-xs text-gray-600 font-semibold">Trusted Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="text-xs text-gray-600 font-semibold">30-Day Returns</span>
            </div>
          </div>
        </form>
        {/* Order Summary */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-2xl p-8 border border-slate-100 flex flex-col justify-between">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cart.length === 0 ? (
              <div className="text-gray-500 text-center">Your cart is empty.</div>
            ) : (
              cart.map((item, idx) => (
                <div key={item._id} className="flex items-center gap-4 border-b border-slate-100 pb-3 last:border-b-0">
                  <img src={item.images?.[0] || '/placeholder.png'} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>
          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%)</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-slate-200 pt-2">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6 text-xs text-gray-400 text-center">
            All prices are inclusive of taxes. Free shipping on all orders!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 