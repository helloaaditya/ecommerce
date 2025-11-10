const Order = require('../models/Order');
const emailService = require('../utils/emailService');

/**
 * Process scheduled installment payments
 * This function should be run daily via cron job
 */
const processScheduledInstallments = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    console.log(`[${new Date().toISOString()}] Running scheduled installment payments...`);
    
    // Find orders with installments due today
    const ordersWithDuePayments = await Order.find({
      'paymentPlan.type': 'installment',
      'paymentPlan.nextInstallmentDate': { $lte: today },
      status: { $in: ['pending', 'payment_in_progress'] }
    }).populate('user', 'name email');
    
    console.log(`Found ${ordersWithDuePayments.length} orders with due installments`);
    
    for (const order of ordersWithDuePayments) {
      try {
        // Check if all installments are already paid
        if (order.paymentPlan.installmentsPaid >= order.paymentPlan.installmentCount) {
          console.log(`⚠️  Order ${order.orderNumber} - All installments already paid`);
          continue;
        }
        
        // In production, you would charge the customer via Stripe ACH here
        // For now, we'll simulate a successful payment
        // Example with Stripe:
        /*
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        const charge = await stripe.charges.create({
          amount: Math.round(order.paymentPlan.installmentAmount * 100), // in cents
          currency: 'usd',
          customer: order.achDetails.stripeCustomerId,
          source: order.achDetails.stripeBankAccountId,
          description: `Installment ${order.paymentPlan.installmentsPaid + 1} for Order ${order.orderNumber}`
        });
        
        if (charge.status !== 'succeeded' && charge.status !== 'pending') {
          throw new Error('Payment failed');
        }
        */
        
        // Simulate successful payment (remove this in production)
        console.log(`💳 Processing installment ${order.paymentPlan.installmentsPaid + 1} for order ${order.orderNumber}`);
        
        // Update order with successful payment
        order.paymentPlan.installmentsPaid += 1;
        order.paymentPlan.installmentHistory.push({
          installmentNumber: order.paymentPlan.installmentsPaid,
          amount: order.paymentPlan.installmentAmount,
          paidDate: new Date(),
          paymentId: `simulated_${Date.now()}`, // In production: charge.id
          status: 'paid'
        });
        
        // Calculate next installment date if not all paid
        if (order.paymentPlan.installmentsPaid < order.paymentPlan.installmentCount) {
          const nextDate = new Date(order.paymentPlan.nextInstallmentDate);
          switch(order.paymentPlan.installmentFrequency) {
            case 'weekly':
              nextDate.setDate(nextDate.getDate() + 7);
              break;
            case 'biweekly':
              nextDate.setDate(nextDate.getDate() + 14);
              break;
            case 'monthly':
              nextDate.setMonth(nextDate.getMonth() + 1);
              break;
          }
          order.paymentPlan.nextInstallmentDate = nextDate;
        }
        
        await order.save();
        
        console.log(`✅ Installment ${order.paymentPlan.installmentsPaid}/${order.paymentPlan.installmentCount} paid for order ${order.orderNumber}`);
        
        // Send email notification to customer
        try {
          if (order.user && order.user.email) {
            const isLastPayment = order.paymentPlan.installmentsPaid >= order.paymentPlan.installmentCount;
            
            if (isLastPayment) {
              // All installments paid - order ready to ship
              await emailService.sendEmail({
                to: order.user.email,
                subject: '🎉 Final Payment Complete - Order Ready to Ship!',
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4CAF50;">Payment Complete!</h2>
                    <p>Hi ${order.user.name},</p>
                    <p>Great news! Your final installment payment of <strong>$${order.paymentPlan.installmentAmount.toFixed(2)}</strong> has been successfully processed.</p>
                    <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                    <p><strong>Total Paid:</strong> $${order.total.toFixed(2)}</p>
                    <p>✅ All ${order.paymentPlan.installmentCount} installments are now complete!</p>
                    <p>📦 Your order is now ready to ship. You'll receive a tracking number within 1-2 business days.</p>
                    <p>Thank you for your purchase!</p>
                  </div>
                `
              });
              console.log(`📧 Final payment email sent to ${order.user.email}`);
            } else {
              // Installment payment confirmation
              const remainingPayments = order.paymentPlan.installmentCount - order.paymentPlan.installmentsPaid;
              await emailService.sendEmail({
                to: order.user.email,
                subject: `✅ Installment Payment #${order.paymentPlan.installmentsPaid} Received`,
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2196F3;">Payment Received</h2>
                    <p>Hi ${order.user.name},</p>
                    <p>Your installment payment of <strong>$${order.paymentPlan.installmentAmount.toFixed(2)}</strong> has been successfully processed.</p>
                    <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                    <p><strong>Payment Progress:</strong> ${order.paymentPlan.installmentsPaid} of ${order.paymentPlan.installmentCount} installments paid</p>
                    <p><strong>Remaining Payments:</strong> ${remainingPayments} × $${order.paymentPlan.installmentAmount.toFixed(2)}</p>
                    <p><strong>Next Payment Date:</strong> ${new Date(order.paymentPlan.nextInstallmentDate).toLocaleDateString()}</p>
                    <p>Your order will ship automatically once all installments are complete.</p>
                    <p>Thank you!</p>
                  </div>
                `
              });
              console.log(`📧 Installment confirmation email sent to ${order.user.email}`);
            }
          }
        } catch (emailError) {
          console.error(`Failed to send email for order ${order.orderNumber}:`, emailError.message);
        }
        
        // If all installments paid, notify admin/warehouse to ship
        if (order.readyToShip) {
          console.log(`📦 Order ${order.orderNumber} is ready to ship!`);
          // TODO: Send notification to admin/warehouse system
        }
        
      } catch (paymentError) {
        console.error(`❌ Failed to process payment for order ${order.orderNumber}:`, paymentError.message);
        
        // Record failed payment
        order.paymentPlan.installmentHistory.push({
          installmentNumber: order.paymentPlan.installmentsPaid + 1,
          amount: order.paymentPlan.installmentAmount,
          paidDate: new Date(),
          status: 'failed',
          failureReason: paymentError.message
        });
        
        // Calculate retry date (e.g., retry in 3 days)
        const retryDate = new Date(order.paymentPlan.nextInstallmentDate);
        retryDate.setDate(retryDate.getDate() + 3);
        order.paymentPlan.nextInstallmentDate = retryDate;
        
        await order.save();
        
        // Send failed payment email to customer
        try {
          if (order.user && order.user.email) {
            await emailService.sendEmail({
              to: order.user.email,
              subject: '⚠️ Installment Payment Failed',
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #f44336;">Payment Failed</h2>
                  <p>Hi ${order.user.name},</p>
                  <p>We were unable to process your installment payment of <strong>$${order.paymentPlan.installmentAmount.toFixed(2)}</strong> for order ${order.orderNumber}.</p>
                  <p><strong>Reason:</strong> ${paymentError.message}</p>
                  <p>We'll automatically retry the payment on ${retryDate.toLocaleDateString()}.</p>
                  <p>If you have questions or need to update your payment information, please contact us.</p>
                  <p>Thank you!</p>
                </div>
              `
            });
          }
        } catch (emailError) {
          console.error(`Failed to send failure email for order ${order.orderNumber}:`, emailError.message);
        }
      }
    }
    
    console.log(`[${new Date().toISOString()}] Scheduled installment payments completed`);
    
  } catch (error) {
    console.error('Error processing scheduled installments:', error);
  }
};

/**
 * Send reminder emails for upcoming installment payments
 * Run this 2-3 days before payment is due
 */
const sendPaymentReminders = async () => {
  try {
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    threeDaysFromNow.setHours(0, 0, 0, 0);
    
    const fourDaysFromNow = new Date();
    fourDaysFromNow.setDate(fourDaysFromNow.getDate() + 4);
    fourDaysFromNow.setHours(0, 0, 0, 0);
    
    console.log(`[${new Date().toISOString()}] Sending payment reminders...`);
    
    // Find orders with installments due in 3 days
    const ordersWithUpcomingPayments = await Order.find({
      'paymentPlan.type': 'installment',
      'paymentPlan.nextInstallmentDate': { 
        $gte: threeDaysFromNow, 
        $lt: fourDaysFromNow 
      },
      status: { $in: ['pending', 'payment_in_progress'] }
    }).populate('user', 'name email');
    
    console.log(`Found ${ordersWithUpcomingPayments.length} orders with upcoming payments`);
    
    for (const order of ordersWithUpcomingPayments) {
      try {
        if (order.user && order.user.email) {
          await emailService.sendEmail({
            to: order.user.email,
            subject: `⏰ Reminder: Installment Payment Due Soon`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #FF9800;">Payment Reminder</h2>
                <p>Hi ${order.user.name},</p>
                <p>This is a friendly reminder that your installment payment is coming up soon!</p>
                <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                <p><strong>Payment Amount:</strong> $${order.paymentPlan.installmentAmount.toFixed(2)}</p>
                <p><strong>Payment Date:</strong> ${new Date(order.paymentPlan.nextInstallmentDate).toLocaleDateString()}</p>
                <p><strong>Payment Method:</strong> Bank Account ending in ${order.achDetails?.accountNumberLast4 || 'xxxx'}</p>
                <p>Please ensure you have sufficient funds in your account.</p>
                <p>Questions? Contact us anytime.</p>
                <p>Thank you!</p>
              </div>
            `
          });
          console.log(`📧 Reminder sent to ${order.user.email} for order ${order.orderNumber}`);
        }
      } catch (error) {
        console.error(`Failed to send reminder for order ${order.orderNumber}:`, error.message);
      }
    }
    
    console.log(`[${new Date().toISOString()}] Payment reminders sent`);
    
  } catch (error) {
    console.error('Error sending payment reminders:', error);
  }
};

module.exports = {
  processScheduledInstallments,
  sendPaymentReminders
};

