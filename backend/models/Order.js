const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    unique: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      image: {
        type: String
      }
    }
  ],
  shippingAddress: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'payment_in_progress', 'payment_complete', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingNumber: {
    type: String
  },
  paymentMethod: {
    type: String,
    default: 'credit_card'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'failed'],
    default: 'pending'
  },
  phone: {
    type: String
  },
  // ACH Payment Details
  achDetails: {
    accountHolderName: String,
    accountType: {
      type: String,
      enum: ['checking', 'savings']
    },
    accountNumberLast4: String,
    routingNumber: String,
    mandateDate: Date,
    mandateAccepted: Boolean,
    stripeCustomerId: String,
    stripeBankAccountId: String
  },
  // Installment Payment Plan
  paymentPlan: {
    type: {
      type: String,
      enum: ['full', 'installment'],
      default: 'full'
    },
    installmentCount: {
      type: Number,
      default: 1
    },
    installmentAmount: Number,
    installmentFrequency: {
      type: String,
      enum: ['weekly', 'biweekly', 'monthly'],
      default: 'monthly'
    },
    installmentsPaid: {
      type: Number,
      default: 0
    },
    nextInstallmentDate: Date,
    installmentHistory: [{
      installmentNumber: Number,
      amount: Number,
      paidDate: Date,
      paymentId: String,
      status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
      },
      failureReason: String
    }]
  },
  // Shipping will only be allowed when this is true
  readyToShip: {
    type: Boolean,
    default: false
  },
  shippedDate: Date
}, {
  timestamps: true
});

// Generate order number and handle payment status before saving
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Get count of orders for today
    const todayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    
    const orderCount = await this.constructor.countDocuments({
      createdAt: { $gte: todayStart, $lt: todayEnd }
    });
    
    this.orderNumber = `ORD-${year}${month}${day}-${String(orderCount + 1).padStart(3, '0')}`;
  }
  
  // Auto-update readyToShip based on payment plan
  if (this.paymentPlan && this.paymentPlan.type === 'installment') {
    if (this.paymentPlan.installmentsPaid >= this.paymentPlan.installmentCount) {
      this.readyToShip = true;
      this.paymentStatus = 'paid';
      this.status = 'payment_complete';
    } else if (this.paymentPlan.installmentsPaid > 0) {
      this.paymentStatus = 'partial';
      this.status = 'payment_in_progress';
      this.readyToShip = false;
    }
  } else {
    // Full payment
    if (this.paymentStatus === 'paid') {
      this.readyToShip = true;
    }
  }
  
  next();
});

module.exports = mongoose.model('Order', orderSchema); 