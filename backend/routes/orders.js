const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images description')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { 
      items, 
      shippingAddress, 
      total, 
      paymentMethod, 
      phone,
      paymentPlan,
      achDetails 
    } = req.body;

    // Validate required fields
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    // Create order data
    const orderData = {
      user: req.user._id,
      items,
      shippingAddress,
      total,
      paymentMethod,
      phone
    };

    // Add payment plan if provided
    if (paymentPlan) {
      orderData.paymentPlan = paymentPlan;
    }

    // Add ACH details if provided
    if (achDetails) {
      orderData.achDetails = achDetails;
    }

    // Set payment status based on payment plan
    if (paymentPlan && paymentPlan.type === 'installment') {
      orderData.paymentStatus = paymentPlan.installmentsPaid > 0 ? 'partial' : 'pending';
    } else {
      // For COD and full payments
      orderData.paymentStatus = paymentMethod === 'cod' ? 'pending' : 'paid';
    }

    const order = new Order(orderData);
    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('items.product', 'name images')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      data: populatedOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
router.put('/:id', protect, async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Only allow admin to update order status
    if (req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update order'
      });
    }

    // Check if order is ready to ship for installment payments
    if (status === 'shipped' && !order.readyToShip) {
      return res.status(400).json({
        success: false,
        message: 'Cannot ship order until all installment payments are complete'
      });
    }

    order.status = status || order.status;
    order.trackingNumber = trackingNumber || order.trackingNumber;

    // Set shipped date when status changes to shipped
    if (status === 'shipped' && !order.shippedDate) {
      order.shippedDate = new Date();
    }

    const updatedOrder = await order.save();

    const populatedOrder = await Order.findById(updatedOrder._id)
      .populate('items.product', 'name images')
      .populate('user', 'name email');

    res.json({
      success: true,
      data: populatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router; 