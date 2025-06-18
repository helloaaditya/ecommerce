import { Link } from 'react-router-dom';
import { ArrowLeftIcon, DocumentTextIcon, ShieldCheckIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <DocumentTextIcon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600">Last updated: January 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using ShopHub's website and services, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ShopHub provides an online e-commerce platform that allows users to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Browse and purchase products from our catalog</li>
                <li>Create and manage user accounts</li>
                <li>Track orders and manage wishlists</li>
                <li>Access customer support and services</li>
                <li>Receive promotional offers and updates</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Account Registration
                  </h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• You must provide accurate and complete information</li>
                    <li>• You are responsible for maintaining account security</li>
                    <li>• You must be at least 18 years old to create an account</li>
                    <li>• One account per person is allowed</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 mr-2 text-red-600" />
                    Account Responsibilities
                  </h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Keep your password confidential</li>
                    <li>• Notify us immediately of any unauthorized use</li>
                    <li>• You are liable for all activities under your account</li>
                    <li>• Do not share your account credentials</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Product Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We strive to provide accurate product information, but we do not warrant that product descriptions, prices, 
                or other content is accurate, complete, reliable, current, or error-free.
              </p>
              <div className="bg-yellow-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Important Notes:</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Product images are for illustration purposes only</li>
                  <li>• Actual colors may vary from screen to screen</li>
                  <li>• Prices are subject to change without notice</li>
                  <li>• Product availability is not guaranteed</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Ordering and Payment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Process</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Add items to cart</li>
                    <li>• Review order details</li>
                    <li>• Provide shipping information</li>
                    <li>• Complete payment</li>
                    <li>• Receive order confirmation</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Methods</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Credit/Debit Cards</li>
                    <li>• UPI Payments</li>
                    <li>• Net Banking</li>
                    <li>• Digital Wallets</li>
                    <li>• Cash on Delivery</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Shipping and Delivery</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We offer various shipping options to deliver your orders safely and efficiently.
                </p>
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Shipping Information:</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Free shipping on orders over ₹500</li>
                    <li>• Standard delivery: 3-5 business days</li>
                    <li>• Express delivery: 1-2 business days</li>
                    <li>• Delivery to all major cities in India</li>
                    <li>• Real-time tracking available</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Returns and Refunds</h2>
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Return Policy</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• 30-day return window for most products</li>
                  <li>• Items must be unused and in original packaging</li>
                  <li>• Free return shipping for defective items</li>
                  <li>• Refunds processed within 5-7 business days</li>
                  <li>• Some items may not be eligible for returns</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prohibited Activities</h2>
              <div className="bg-red-50 rounded-xl p-6">
                <p className="text-gray-700 mb-4">
                  You agree not to engage in any of the following activities:
                </p>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Violating any applicable laws or regulations</li>
                  <li>• Attempting to gain unauthorized access to our systems</li>
                  <li>• Interfering with the proper functioning of the website</li>
                  <li>• Using automated tools to access our services</li>
                  <li>• Engaging in fraudulent activities</li>
                  <li>• Harassing or abusing other users or staff</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on this website, including but not limited to text, graphics, logos, images, and software, 
                is the property of ShopHub and is protected by copyright and other intellectual property laws.
              </p>
              <div className="bg-yellow-50 rounded-xl p-4">
                <p className="text-gray-700 text-sm">
                  <strong>Note:</strong> You may not reproduce, distribute, or create derivative works from any content 
                  on this website without our express written permission.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
                to understand our practices regarding the collection and use of your personal information.
              </p>
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Data Protection:</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• We comply with applicable data protection laws</li>
                  <li>• Your personal data is processed securely</li>
                  <li>• We do not sell your personal information</li>
                  <li>• You have rights regarding your personal data</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 mb-4">
                  To the maximum extent permitted by law, ShopHub shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Loss of profits or data</li>
                  <li>• Business interruption</li>
                  <li>• Personal injury or property damage</li>
                  <li>• Any damages arising from use of our services</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of India. 
                Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Delhi, India.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any material changes by:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Posting the updated terms on this page</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying a notice on our website</li>
              </ul>
              <div className="bg-yellow-50 rounded-xl p-4 mt-4">
                <p className="text-gray-700 text-sm">
                  <strong>Important:</strong> Continued use of our services after changes constitutes acceptance of the new terms.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Address:</strong> Shadara, Delhi, 110095</p>
                  <p><strong>Phone:</strong> +91 8797223004</p>
                  <p><strong>Email:</strong> legal@shophub.com</p>
                  <p><strong>Website:</strong> www.shophub.com</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-gray-600 text-sm">
                These Terms of Service are effective as of January 2024. By using our services, 
                you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 