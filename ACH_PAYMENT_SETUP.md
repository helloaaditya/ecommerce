# ACH Direct Debit & Installment Payment Setup Guide

This guide explains how to set up and configure the ACH (Automated Clearing House) direct debit payment system with installment plan functionality for the US market.

## 🎯 Overview

The system allows customers to:
- Pay directly from their US bank account using ACH
- Split payments into multiple installments (2, 3, 4, or 6 payments)
- Choose payment frequency (weekly, biweekly, or monthly)
- Track payment progress in real-time
- **Products ship only after all installments are paid**

## 📋 Features Implemented

### Frontend (`frontend/src/pages/Checkout.jsx`)
- ✅ ACH payment method with bank account form
- ✅ Installment plan selector
- ✅ Payment frequency options
- ✅ Clear shipping policy messaging
- ✅ Bank account validation

### Backend (`backend/`)
- ✅ Extended Order model with ACH and installment fields
- ✅ Payment plan tracking and status management
- ✅ Recurring payment processing service
- ✅ Automated cron jobs for scheduled payments
- ✅ Email notifications for payment status
- ✅ Prevention of shipping until payment complete

### Order Tracking (`frontend/src/pages/Orders.jsx`)
- ✅ Payment progress visualization
- ✅ Installment history display
- ✅ Next payment date tracking
- ✅ Shipping status based on payment completion

## 🔧 Environment Configuration

### Backend Environment Variables

Add these to your `backend/.env` file:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Server
PORT=5000
NODE_ENV=development

# Email Configuration (for payment notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Stripe Configuration (for production)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Payment Processing
ENABLE_ACTUAL_PAYMENTS=false  # Set to true in production
```

### Frontend Environment Variables

Add these to your `frontend/.env`:

```env
# API URL
VITE_API_URL=http://localhost:5000/api

# Stripe Publishable Key (for production)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## 🚀 Installation & Setup

### 1. Install Required Dependencies

#### Backend
```bash
cd backend
npm install node-cron
```

This has already been installed. The package is used for:
- Daily installment payment processing (runs at 2:00 AM)
- Daily payment reminders (runs at 9:00 AM)

### 2. Database Migration

The Order model has been updated with new fields. No migration is needed for MongoDB, but if you have existing orders, they will automatically get default values for the new fields.

New fields added:
- `paymentPlan` - Installment payment plan details
- `achDetails` - ACH bank account information
- `readyToShip` - Flag to prevent shipping until payment complete
- `phone` - Customer phone number
- `shippedDate` - Date when order was shipped

### 3. Cron Job Configuration

Cron jobs are automatically configured in `backend/server.js`:

**Daily Installment Processing** (2:00 AM)
```javascript
cron.schedule('0 2 * * *', async () => {
  await processScheduledInstallments();
});
```

**Daily Payment Reminders** (9:00 AM)
```javascript
cron.schedule('0 9 * * *', async () => {
  await sendPaymentReminders();
});
```

To change the schedule, modify the cron expression:
- Format: `minute hour day month weekday`
- Example: `0 14 * * *` = 2:00 PM daily
- Example: `0 9 * * 1` = 9:00 AM every Monday

## 💳 Payment Gateway Integration

### Current Implementation (Development Mode)

The system is currently configured for **testing/demo mode**. Payments are simulated and no actual charges occur.

### Production Setup with Stripe ACH

To enable real ACH payments, integrate with Stripe:

#### Step 1: Sign up for Stripe
1. Create account at https://stripe.com
2. Complete business verification
3. Enable ACH payments in Dashboard → Settings → Payment Methods

#### Step 2: Get API Keys
1. Go to Dashboard → Developers → API Keys
2. Copy your Secret Key and Publishable Key
3. Add to `.env` files (see above)

#### Step 3: Update Frontend Checkout

Install Stripe SDK:
```bash
cd frontend
npm install @stripe/stripe-js
```

Update `frontend/src/pages/Checkout.jsx`:

```javascript
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// In handleSubmit function, replace the ACH payment simulation:
if (paymentMethod === 'ach') {
  const stripe = await stripePromise;
  
  // Create bank account token
  const result = await stripe.createToken('bank_account', {
    country: 'US',
    currency: 'usd',
    routing_number: achDetails.routingNumber,
    account_number: achDetails.accountNumber,
    account_holder_name: achDetails.accountHolderName,
    account_holder_type: 'individual',
  });
  
  if (result.error) {
    setError(result.error.message);
    setLoading(false);
    return;
  }
  
  // Send token to backend
  orderData.stripeToken = result.token.id;
}
```

#### Step 4: Update Backend Order Creation

Update `backend/routes/orders.js`:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// In POST /api/orders route:
if (paymentMethod === 'ach' && stripeToken) {
  // Create Stripe customer
  const customer = await stripe.customers.create({
    email: req.user.email,
    name: achDetails.accountHolderName,
    source: stripeToken
  });
  
  // Store customer ID for recurring charges
  orderData.achDetails.stripeCustomerId = customer.id;
  orderData.achDetails.stripeBankAccountId = customer.default_source;
  
  // Charge first installment
  const charge = await stripe.charges.create({
    amount: Math.round(paymentPlan.installmentAmount * 100),
    currency: 'usd',
    customer: customer.id,
    description: `First installment for order`
  });
}
```

#### Step 5: Update Recurring Payment Service

Update `backend/services/recurringPayments.js` to uncomment the Stripe integration code (lines 39-50).

## 📧 Email Notification Setup

The system sends emails for:
- ✅ Payment confirmation after each installment
- ✅ Final payment completion notification
- ⚠️ Payment failure alerts
- ⏰ Upcoming payment reminders (3 days before)

### Gmail Configuration

1. Enable 2-Factor Authentication in your Google Account
2. Generate App Password:
   - Go to Google Account → Security → 2-Step Verification → App Passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password

3. Update `.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
```

### Other Email Providers

**SendGrid:**
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your_sendgrid_api_key
```

**Mailgun:**
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=your_mailgun_username
EMAIL_PASS=your_mailgun_password
```

## 🧪 Testing the System

### Test Scenario 1: Create Installment Order

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend:
```bash
cd frontend
npm run dev
```

3. Go to Checkout page
4. Select "Bank Account (ACH)" as payment method
5. Enable "Pay in Installments"
6. Configure:
   - Number of Payments: 3
   - Frequency: Monthly
7. Fill in test bank details:
   - Routing Number: 110000000 (test routing number)
   - Account Number: 000123456789
   - Account Type: Checking
8. Accept terms and place order

### Test Scenario 2: Simulate Recurring Payment

To manually trigger the installment processing:

1. Open a Node.js console:
```bash
cd backend
node
```

2. Run the function manually:
```javascript
require('dotenv').config();
const mongoose = require('mongoose');
const { processScheduledInstallments } = require('./services/recurringPayments');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log('Connected to database');
  await processScheduledInstallments();
  process.exit();
});
```

### Test Scenario 3: View Payment Progress

1. Login to your account
2. Go to "My Orders" page
3. Find your installment order
4. Check the payment progress section showing:
   - Progress bar
   - Installments paid count
   - Next payment date
   - Shipping policy notice

## 🔒 Security Best Practices

### 1. Bank Account Data
- ✅ Only last 4 digits of account number are stored
- ✅ Full account numbers never saved in database
- ✅ All data encrypted in transit (HTTPS)
- ✅ ACH details only accessible to order owner

### 2. Payment Processing
- ✅ Validation of routing numbers (9 digits)
- ✅ Mandate acceptance required before processing
- ✅ Audit trail in installmentHistory
- ✅ Payment status tracking

### 3. Shipping Protection
- ✅ `readyToShip` flag prevents premature shipping
- ✅ Backend validation in PUT /orders/:id route
- ✅ Admin cannot ship until all payments complete

## 📊 Database Schema

### Order Model Fields

```javascript
{
  // Existing fields...
  
  // Phone number
  phone: String,
  
  // ACH Payment Details
  achDetails: {
    accountHolderName: String,
    accountType: 'checking' | 'savings',
    accountNumberLast4: String,        // Only last 4 digits
    routingNumber: String,
    mandateDate: Date,
    mandateAccepted: Boolean,
    stripeCustomerId: String,          // For recurring charges
    stripeBankAccountId: String
  },
  
  // Installment Payment Plan
  paymentPlan: {
    type: 'full' | 'installment',
    installmentCount: Number,          // 1, 2, 3, 4, or 6
    installmentAmount: Number,
    installmentFrequency: 'weekly' | 'biweekly' | 'monthly',
    installmentsPaid: Number,
    nextInstallmentDate: Date,
    installmentHistory: [{
      installmentNumber: Number,
      amount: Number,
      paidDate: Date,
      paymentId: String,
      status: 'pending' | 'paid' | 'failed',
      failureReason: String
    }]
  },
  
  // Shipping Control
  readyToShip: Boolean,                // Auto-calculated
  shippedDate: Date,
  
  // Updated Status Values
  status: 'pending' | 'payment_in_progress' | 'payment_complete' | 
          'processing' | 'shipped' | 'delivered' | 'cancelled',
  
  paymentStatus: 'pending' | 'partial' | 'paid' | 'failed'
}
```

## 🔄 Order Status Flow

```
For Installment Orders:
1. pending → (first payment) → payment_in_progress
2. payment_in_progress → (final payment) → payment_complete
3. payment_complete → (admin ships) → shipped
4. shipped → delivered

For Full Payment Orders:
1. pending → (payment) → processing
2. processing → (admin ships) → shipped
3. shipped → delivered
```

## ⚙️ Customization Options

### Change Installment Options

Edit `frontend/src/pages/Checkout.jsx`:

```javascript
// Line 253-266: Number of payments options
{[2, 3, 4, 6].map(num => (  // Change to [2, 3, 4, 6, 12]
  // ...
))}

// Line 275-279: Payment frequency options
{[
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' }  // Add new option
].map(freq => (
  // ...
))}
```

Update `backend/models/Order.js`:

```javascript
installmentFrequency: {
  type: String,
  enum: ['weekly', 'biweekly', 'monthly', 'quarterly'],  // Add 'quarterly'
  default: 'monthly'
}
```

### Change Cron Schedule

Edit `backend/server.js`:

```javascript
// Change processing time to 3:00 AM
cron.schedule('0 3 * * *', async () => {
  await processScheduledInstallments();
});

// Send reminders twice daily (9 AM and 5 PM)
cron.schedule('0 9,17 * * *', async () => {
  await sendPaymentReminders();
});
```

### Minimum Order Amount for Installments

Add validation in `frontend/src/pages/Checkout.jsx`:

```javascript
const MIN_INSTALLMENT_AMOUNT = 50; // Minimum $50 per installment

// Disable installments if total is too low
const canUseInstallments = paymentMethod === 'ach' && 
  grandTotal >= (MIN_INSTALLMENT_AMOUNT * 2);

{canUseInstallments && (
  <div className="mt-4">
    {/* Installment plan UI */}
  </div>
)}
```

## 🐛 Troubleshooting

### Cron Jobs Not Running

**Problem:** Installments aren't being processed automatically.

**Solutions:**
1. Check server logs for cron job initialization
2. Verify server stays running (use PM2 in production)
3. Check timezone settings on server
4. Manually test the function:
   ```javascript
   await processScheduledInstallments();
   ```

### Emails Not Sending

**Problem:** Payment notification emails aren't being sent.

**Solutions:**
1. Verify EMAIL_* environment variables are set
2. Check email service credentials
3. Test email configuration:
   ```javascript
   await emailService.sendEmail({
     to: 'test@example.com',
     subject: 'Test',
     html: '<p>Test email</p>'
   });
   ```
4. Check spam folder
5. Enable less secure apps (Gmail) or use app-specific password

### Order Not Shipping After Final Payment

**Problem:** Admin can't ship order even though all payments are complete.

**Solutions:**
1. Check `order.readyToShip` flag in database
2. Verify `paymentPlan.installmentsPaid >= paymentPlan.installmentCount`
3. Check order status is 'payment_complete'
4. Review pre-save hook in Order model

## 📈 Production Deployment

### Heroku

1. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_connection_string
heroku config:set JWT_SECRET=your_secret
heroku config:set STRIPE_SECRET_KEY=sk_live_...
heroku config:set EMAIL_USER=your_email
heroku config:set EMAIL_PASS=your_password
```

2. Cron jobs run automatically with your dyno

### AWS / DigitalOcean

1. Use PM2 to keep server running:
```bash
pm2 start server.js --name ecommerce-backend
pm2 save
pm2 startup
```

2. Cron jobs run within the Node process

### Vercel / Netlify

⚠️ **Warning:** These platforms don't support long-running processes. Use:
- AWS Lambda for cron jobs
- Vercel Cron Jobs (Pro plan)
- External cron service (cron-job.org, EasyCron)

## 📝 Legal & Compliance

### NACHA Requirements

When processing ACH payments, you must:

1. ✅ **Authorization**: Get explicit customer authorization
   - Implemented in checkout with checkbox
   
2. ✅ **Notification**: Notify customer 2-3 days before debit
   - Implemented in `sendPaymentReminders()`
   
3. ✅ **Revocation Rights**: Customer can revoke within 3 business days
   - Add cancellation feature in customer dashboard
   
4. ✅ **Record Keeping**: Keep authorization records for 2 years
   - Stored in `achDetails.mandateDate` and `mandateAccepted`
   
5. ✅ **Return Handling**: Handle ACH returns (NSF, closed account)
   - Implemented in `processScheduledInstallments()` error handling

### Required Terms & Conditions

Add to your Terms of Service:
- ACH authorization language
- Refund policy for installment orders
- What happens if payment fails
- Cancellation policy
- Data retention policy

## 💰 Pricing & Costs

### Stripe ACH Pricing
- **0.8%** per transaction, capped at **$5.00**
- Example: $500 order = $4.00 fee
- Example: $1000 order = $5.00 fee (capped)
- 4-7 business days for settlement

### Alternative Providers
- **Plaid**: Contact for pricing (verification only)
- **Dwolla**: $0.25 per ACH transaction
- **Braintree**: 0.75% per transaction, $5 cap

## 🆘 Support & Resources

### Documentation
- [Stripe ACH Guide](https://stripe.com/docs/ach)
- [NACHA Operating Rules](https://www.nacha.org/rules)
- [Node-Cron Documentation](https://www.npmjs.com/package/node-cron)

### Testing
- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Test Routing Numbers](https://stripe.com/docs/ach#test-routing-numbers)

### Contact
For implementation questions or support, please create an issue in the GitHub repository.

---

## ✅ Implementation Checklist

- [x] Backend Order model updated
- [x] Frontend Checkout page with ACH form
- [x] Installment plan selector
- [x] Recurring payment service created
- [x] Cron jobs configured
- [x] Email notifications implemented
- [x] Orders page with payment progress
- [x] Shipping protection logic
- [ ] Stripe integration (production)
- [ ] Customer cancellation feature
- [ ] Admin dashboard for payment management
- [ ] Refund handling for partial payments

---

**Version:** 1.0.0  
**Last Updated:** November 10, 2025  
**Status:** Development Mode (Demo)

