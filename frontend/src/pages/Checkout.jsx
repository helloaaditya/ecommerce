import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const paymentOptions = [
  { value: 'cod', label: 'Cash on Delivery' },
  { value: 'ach', label: 'Bank Account (ACH)' },
  { value: 'card', label: 'Credit/Debit Card' },
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
  
  // ACH Payment Details
  const [achDetails, setAchDetails] = useState({
    accountHolderName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking',
    acceptTerms: false
  });
  
  // Installment Plan
  const [installmentPlan, setInstallmentPlan] = useState({
    enabled: false,
    installments: 3,
    frequency: 'monthly'
  });

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = cartTotal * 0.1;
  const grandTotal = cartTotal + tax;
  
  // Calculate installment amount
  const installmentAmount = installmentPlan.enabled 
    ? (grandTotal / installmentPlan.installments).toFixed(2)
    : grandTotal.toFixed(2);

  // Calculate next installment date
  const getNextInstallmentDate = (frequency) => {
    const now = new Date();
    switch(frequency) {
      case 'weekly':
        return new Date(now.setDate(now.getDate() + 7));
      case 'biweekly':
        return new Date(now.setDate(now.getDate() + 14));
      case 'monthly':
        return new Date(now.setMonth(now.getMonth() + 1));
      default:
        return new Date(now.setMonth(now.getMonth() + 1));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validate ACH if selected
      if (paymentMethod === 'ach') {
        if (achDetails.routingNumber.length !== 9) {
          setError('Routing number must be 9 digits');
          setLoading(false);
          return;
        }
        if (!achDetails.acceptTerms) {
          setError('Please accept the ACH authorization agreement');
          setLoading(false);
          return;
        }
      }
      
      // Payment gateway logic placeholder
      if (paymentMethod !== 'cod' && paymentMethod !== 'ach') {
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
        total: grandTotal,
        
        // Installment plan data
        paymentPlan: installmentPlan.enabled ? {
          type: 'installment',
          installmentCount: installmentPlan.installments,
          installmentAmount: parseFloat(installmentAmount),
          installmentFrequency: installmentPlan.frequency,
          installmentsPaid: 1,
          nextInstallmentDate: getNextInstallmentDate(installmentPlan.frequency),
          installmentHistory: [{
            installmentNumber: 1,
            amount: parseFloat(installmentAmount),
            paidDate: new Date(),
            status: 'paid'
          }]
        } : {
          type: 'full',
          installmentCount: 1,
          installmentsPaid: 1
        },
        
        // ACH details
        ...(paymentMethod === 'ach' && {
          achDetails: {
            accountHolderName: achDetails.accountHolderName,
            accountType: achDetails.accountType,
            accountNumberLast4: achDetails.accountNumber.slice(-4),
            routingNumber: achDetails.routingNumber,
            mandateDate: new Date().toISOString(),
            mandateAccepted: achDetails.acceptTerms
          }
        })
      };
      
      await axios.post('/orders', orderData);
      clearCart();
      
      // Show appropriate message
      if (installmentPlan.enabled) {
        alert(`✅ First installment of $${installmentAmount} charged successfully!\n\nRemaining ${installmentPlan.installments - 1} payments will be charged ${installmentPlan.frequency}.\n\n📦 Your order will ship after all payments are complete.`);
      }
      
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

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
                  {option.value !== 'cod' && option.value !== 'ach' && (
                    <span className="ml-2 text-xs text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full">Coming Soon</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Installment Plan Section */}
          {paymentMethod === 'ach' && (
            <div className="mt-4">
              <label className="block font-semibold mb-2 text-gray-700">Payment Plan</label>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200 mb-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={installmentPlan.enabled}
                    onChange={(e) => setInstallmentPlan({...installmentPlan, enabled: e.target.checked})}
                    className="w-5 h-5 accent-blue-600 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Pay in Installments</div>
                    <div className="text-xs text-gray-600 mt-1">
                      Split your payment into multiple installments. Product ships after final payment.
                    </div>
                  </div>
                </label>
              </div>
              
              {installmentPlan.enabled && (
                <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Payments
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[2, 3, 4, 6].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setInstallmentPlan({...installmentPlan, installments: num})}
                          className={`py-2 px-3 rounded-lg border-2 transition-all ${
                            installmentPlan.installments === num
                              ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                              : 'border-slate-200 text-gray-600 hover:border-blue-300'
                          }`}
                        >
                          {num}x
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Frequency
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'weekly', label: 'Weekly' },
                        { value: 'biweekly', label: 'Bi-weekly' },
                        { value: 'monthly', label: 'Monthly' }
                      ].map(freq => (
                        <button
                          key={freq.value}
                          type="button"
                          onClick={() => setInstallmentPlan({...installmentPlan, frequency: freq.value})}
                          className={`py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                            installmentPlan.frequency === freq.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                              : 'border-slate-200 text-gray-600 hover:border-blue-300'
                          }`}
                        >
                          {freq.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between font-semibold text-gray-800">
                        <span>Each Payment:</span>
                        <span className="text-lg text-green-600">${installmentAmount}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 text-xs">
                        <span>Total Payments:</span>
                        <span>{installmentPlan.installments} × ${installmentAmount}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 text-xs">
                        <span>Payment Schedule:</span>
                        <span className="capitalize">{installmentPlan.frequency}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-green-300">
                      <p className="text-xs text-gray-700 leading-relaxed">
                        <strong>📦 Shipping Policy:</strong> Your order will be processed and 
                        shipped <strong>after your final installment payment is received</strong>. 
                        You'll receive a tracking number once shipped.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-800">
                      ⚠️ <strong>Important:</strong> Your bank account will be automatically 
                      charged {installmentPlan.frequency}. First payment is charged today. 
                      You can cancel anytime before the next scheduled payment.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ACH Form Section */}
          {paymentMethod === 'ach' && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="mb-3">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-xl">🏦</span>
                  ACH Direct Debit Authorization
                </h3>
                <div className="bg-white p-3 rounded-lg mb-4 border border-blue-100">
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    <strong>What is ACH?</strong> ACH (Automated Clearing House) is a secure electronic 
                    payment network that allows you to pay directly from your US bank account.
                  </p>
                  <div className="bg-green-50 p-2 rounded-lg border border-green-200">
                    <p className="text-xs text-green-800">
                      ✓ Lower fees • ✓ Secure & regulated • ✓ No card needed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full name as it appears on account"
                    value={achDetails.accountHolderName}
                    onChange={(e) => setAchDetails({...achDetails, accountHolderName: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    required={paymentMethod === 'ach'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="accountType"
                        value="checking"
                        checked={achDetails.accountType === 'checking'}
                        onChange={(e) => setAchDetails({...achDetails, accountType: e.target.value})}
                        className="accent-blue-600"
                      />
                      <span className="text-sm text-gray-700">Checking</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="accountType"
                        value="savings"
                        checked={achDetails.accountType === 'savings'}
                        onChange={(e) => setAchDetails({...achDetails, accountType: e.target.value})}
                        className="accent-blue-600"
                      />
                      <span className="text-sm text-gray-700">Savings</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Routing Number (9 digits)
                  </label>
                  <input
                    type="text"
                    placeholder="123456789"
                    value={achDetails.routingNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 9);
                      setAchDetails({...achDetails, routingNumber: value});
                    }}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    maxLength="9"
                    required={paymentMethod === 'ach'}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Found on the bottom left of your check
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Account number"
                    value={achDetails.accountNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setAchDetails({...achDetails, accountNumber: value});
                    }}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    maxLength="17"
                    required={paymentMethod === 'ach'}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Found on the bottom of your check, after routing number
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={achDetails.acceptTerms}
                      onChange={(e) => setAchDetails({...achDetails, acceptTerms: e.target.checked})}
                      className="mt-1 accent-blue-600"
                      required={paymentMethod === 'ach'}
                    />
                    <div className="text-xs text-gray-700 leading-relaxed">
                      <strong className="block mb-1">ACH Authorization Agreement</strong>
                      I authorize this organization to electronically debit my account 
                      as indicated above. This authorization will remain in effect until I notify 
                      the organization that I wish to revoke it. I certify that I am 
                      an authorized user of this bank account and will not dispute this transaction 
                      with my bank.
                    </div>
                  </label>
                </div>

                <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <span className="text-blue-600 text-lg">🔒</span>
                  <p className="text-xs text-blue-800">
                    Your bank account information is encrypted and secure. We never store your 
                    full account details on our servers.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col items-center mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              disabled={loading}
            >
              {loading ? 'Processing...' : 
               installmentPlan.enabled ? 
               `Pay First Installment ($${installmentAmount})` : 
               'Place Order'}
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