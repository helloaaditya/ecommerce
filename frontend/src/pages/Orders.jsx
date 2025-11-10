import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  ShoppingBagIcon, 
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  StarIcon,
  CalendarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [payingInstallment, setPayingInstallment] = useState(null);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/orders');
      const fetchedOrders = response.data.data || [];
      setOrders(fetchedOrders);
      
      // Debug: Log all orders with their payment plan info
      console.log('=== ALL ORDERS DEBUG ===');
      fetchedOrders.forEach((order, index) => {
        console.log(`Order ${index + 1}:`, order.orderNumber, {
          hasPaymentPlan: !!order.paymentPlan,
          paymentPlanType: order.paymentPlan?.type,
          isInstallment: order.paymentPlan?.type === 'installment',
          installmentsPaid: order.paymentPlan?.installmentsPaid,
          installmentCount: order.paymentPlan?.installmentCount,
          paymentMethod: order.paymentMethod
        });
      });
      console.log('=== END DEBUG ===');
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = async (orderId) => {
    if (!window.confirm('Pay next installment now? (This is a demo - no actual charge will be made)')) {
      return;
    }
    
    setPayingInstallment(orderId);
    try {
      // In production, this would integrate with Stripe to process the payment
      // For demo, we'll just show a message
      alert('✅ Payment processing...\n\nIn production, this would:\n1. Charge your bank account via ACH\n2. Update payment progress\n3. Send confirmation email\n\nFor now, payments are processed automatically by the cron job at 2 AM daily.');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setPayingInstallment(null);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-blue-500" />;
      case 'processing':
      case 'payment_complete':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'payment_in_progress':
        return <ClockIcon className="h-5 w-5 text-orange-500" />;
      case 'cancelled':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
      case 'payment_complete':
        return 'bg-yellow-100 text-yellow-800';
      case 'payment_in_progress':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      case 'payment_complete':
        return 'Payment Complete';
      case 'payment_in_progress':
        return 'Payment in Progress';
      case 'cancelled':
        return 'Cancelled';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'all') return true;
    return order.status === activeFilter;
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to view your orders.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBagIcon className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">My Orders</h1>
            <p className="text-xl text-blue-100">Track your order history and status</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{orders.length}</div>
            <div className="text-gray-600">Total Orders</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
            <div className="text-gray-600">Delivered</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {orders.filter(o => o.status === 'shipped').length}
            </div>
            <div className="text-gray-600">In Transit</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {orders.filter(o => o.status === 'processing' || o.status === 'pending').length}
            </div>
            <div className="text-gray-600">Processing</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'all', name: 'All Orders', count: orders.length },
              { id: 'delivered', name: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
              { id: 'shipped', name: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
              { id: 'processing', name: 'Processing', count: orders.filter(o => o.status === 'processing' || o.status === 'pending').length },
              { id: 'cancelled', name: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span>{filter.name}</span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 max-w-md mx-auto shadow-lg">
              <ShoppingBagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                {activeFilter === 'all' 
                  ? "You haven't placed any orders yet." 
                  : `No ${activeFilter} orders found.`
                }
              </p>
              <Link
                to="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      {getStatusIcon(order.status)}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                          </div>
                          <span>•</span>
                          <span>{order.items.length} items</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ShoppingBagIcon className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity} • ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* DEBUG: Show payment plan status */}
                  <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-lg text-xs">
                    <p className="font-semibold mb-1">🔍 Debug Info:</p>
                    <p>Payment Method: <span className="font-mono">{order.paymentMethod || 'N/A'}</span></p>
                    <p>Has Payment Plan: <span className="font-mono">{order.paymentPlan ? 'Yes' : 'No'}</span></p>
                    {order.paymentPlan && (
                      <>
                        <p>Plan Type: <span className="font-mono">{order.paymentPlan.type || 'N/A'}</span></p>
                        <p>Is Installment: <span className="font-mono">{order.paymentPlan.type === 'installment' ? '✅ YES' : '❌ NO'}</span></p>
                        {order.paymentPlan.type === 'installment' && (
                          <p className="text-green-600 font-bold mt-1">✅ Button should be visible below!</p>
                        )}
                      </>
                    )}
                    {!order.paymentPlan && (
                      <p className="text-orange-600 font-bold mt-1">
                        ⚠️ This order has no payment plan. Create a new order with ACH + Installments to see the button.
                      </p>
                    )}
                  </div>

                  {/* Payment Progress Section - Only for Installment Orders */}
                  {order.paymentPlan?.type === 'installment' && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                          <span className="text-lg">💳</span>
                          Payment Progress
                        </h4>
                        <span className="text-sm font-medium text-gray-600">
                          {order.paymentPlan.installmentsPaid} / {order.paymentPlan.installmentCount} paid
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${(order.paymentPlan.installmentsPaid / order.paymentPlan.installmentCount) * 100}%`
                          }}
                        ></div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-gray-600 text-xs mb-1">Installment Amount</p>
                          <p className="font-semibold text-gray-900">
                            ${order.paymentPlan.installmentAmount?.toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-gray-600 text-xs mb-1">Payment Frequency</p>
                          <p className="font-semibold text-gray-900 capitalize">
                            {order.paymentPlan.installmentFrequency}
                          </p>
                        </div>
                        
                        {order.paymentPlan.installmentsPaid < order.paymentPlan.installmentCount && order.paymentPlan.nextInstallmentDate && (
                          <div className="bg-white p-3 rounded-lg md:col-span-2">
                            <p className="text-gray-600 text-xs mb-1">Next Payment Date</p>
                            <p className="font-semibold text-blue-600">
                              {(() => {
                                try {
                                  const date = new Date(order.paymentPlan.nextInstallmentDate);
                                  return date.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  });
                                } catch (e) {
                                  return 'Date pending';
                                }
                              })()}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {order.paymentPlan.installmentsPaid >= order.paymentPlan.installmentCount ? (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800 font-semibold flex items-center gap-2">
                            <span>✅</span>
                            All payments complete! Your order will ship soon.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-xs text-yellow-800">
                              <strong>📦 Shipping Note:</strong> Your order will ship after all {order.paymentPlan.installmentCount} installments are paid.
                              Remaining: {order.paymentPlan.installmentCount - order.paymentPlan.installmentsPaid} payment(s)
                            </p>
                          </div>
                          
                          {/* Pay Now Button */}
                          <div className="mt-3 flex justify-end">
                            <button
                              onClick={() => handlePayNow(order._id)}
                              disabled={payingInstallment === order._id}
                              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {payingInstallment === order._id ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                  <span>Processing...</span>
                                </>
                              ) : (
                                <>
                                  <span>💳</span>
                                  <span>Pay Next Installment</span>
                                </>
                              )}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Order Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Shipping Address</p>
                            <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                          </div>
                        </div>
                        {order.trackingNumber && (
                          <div className="flex items-center space-x-2">
                            <TruckIcon className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                              <p className="text-sm text-gray-600">{order.trackingNumber}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        {order.status === 'delivered' && (
                          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                            <StarIcon className="h-4 w-4" />
                            <span>Write Review</span>
                          </button>
                        )}
                        <button 
                          onClick={() => handleViewDetails(order)}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <EyeIcon className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action for Empty State */}
        {orders.length === 0 && (
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to start shopping?</h3>
              <p className="text-xl text-blue-100 mb-8">
                Explore our amazing products and place your first order!
              </p>
              <Link
                to="/products"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                <span>Browse Products</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <p className="text-blue-100">{selectedOrder.orderNumber}</p>
                </div>
                <button
                  onClick={closeOrderDetails}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Order Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  {getStatusIcon(selectedOrder.status)}
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold text-gray-900">{getStatusText(selectedOrder.status)}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusText(selectedOrder.status)}
                </span>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-xs text-gray-600 mb-1">Order Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                  <p className="font-semibold text-gray-900 text-xl">${selectedOrder.total.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <p className="text-xs text-gray-600 mb-1">Payment Method</p>
                  <p className="font-semibold text-gray-900 capitalize">
                    {selectedOrder.paymentMethod === 'ach' ? 'Bank Account (ACH)' : selectedOrder.paymentMethod.toUpperCase()}
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl">
                  <p className="text-xs text-gray-600 mb-1">Payment Status</p>
                  <p className="font-semibold text-gray-900 capitalize">{selectedOrder.paymentStatus}</p>
                </div>
              </div>

              {/* Payment History - Only for Installment Orders */}
              {selectedOrder.paymentPlan?.type === 'installment' && selectedOrder.paymentPlan.installmentHistory?.length > 0 && (
                <div className="border border-gray-200 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📋</span>
                    Payment History
                  </h3>
                  <div className="space-y-2">
                    {selectedOrder.paymentPlan.installmentHistory.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                            payment.status === 'paid' ? 'bg-green-500' : 
                            payment.status === 'failed' ? 'bg-red-500' : 
                            'bg-gray-400'
                          }`}>
                            {payment.installmentNumber}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              Installment {payment.installmentNumber}
                            </p>
                            <p className="text-xs text-gray-600">
                              {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : 'Pending'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${payment.amount?.toFixed(2)}</p>
                          <p className={`text-xs font-medium ${
                            payment.status === 'paid' ? 'text-green-600' : 
                            payment.status === 'failed' ? 'text-red-600' : 
                            'text-gray-600'
                          }`}>
                            {payment.status === 'paid' ? '✓ Paid' : 
                             payment.status === 'failed' ? '✗ Failed' : 
                             '○ Pending'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ShoppingBagIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Info */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Shipping Information</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                      <p className="text-sm text-gray-600">{selectedOrder.shippingAddress}</p>
                    </div>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div className="flex items-start gap-2 mt-2">
                      <TruckIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                        <p className="text-sm text-gray-600 font-mono">{selectedOrder.trackingNumber}</p>
                      </div>
                    </div>
                  )}
                  {selectedOrder.shippedDate && (
                    <div className="flex items-start gap-2 mt-2">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Shipped Date</p>
                        <p className="text-sm text-gray-600">
                          {new Date(selectedOrder.shippedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={closeOrderDetails}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders; 