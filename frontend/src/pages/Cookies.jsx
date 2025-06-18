import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ShieldCheckIcon, Cog6ToothIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const Cookies = () => {
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
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheckIcon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-xl text-gray-600">Last updated: January 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <InformationCircleIcon className="h-6 w-6 mr-2 text-blue-600" />
                What Are Cookies?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit our website. 
                They help us provide you with a better browsing experience by remembering your preferences, analyzing how you use our site, 
                and personalizing content and advertisements.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <ShieldCheckIcon className="h-5 w-5 mr-2 text-green-600" />
                    Essential Cookies
                  </h3>
                  <p className="text-gray-700 mb-3">
                    These cookies are necessary for the website to function properly and cannot be disabled.
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Session management and security</li>
                    <li>• Shopping cart functionality</li>
                    <li>• User authentication</li>
                    <li>• Basic website navigation</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Cog6ToothIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Functional Cookies
                  </h3>
                  <p className="text-gray-700 mb-3">
                    These cookies enhance your browsing experience by remembering your preferences and settings.
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Language and region preferences</li>
                    <li>• User interface customization</li>
                    <li>• Form auto-fill functionality</li>
                    <li>• Shopping cart contents</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
                  <p className="text-gray-700 mb-3">
                    These cookies help us understand how visitors interact with our website to improve performance.
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Page visit statistics</li>
                    <li>• User behavior analysis</li>
                    <li>• Website performance monitoring</li>
                    <li>• Error tracking and debugging</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Marketing Cookies</h3>
                  <p className="text-gray-700 mb-3">
                    These cookies are used to deliver relevant advertisements and track marketing campaign performance.
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Targeted advertising</li>
                    <li>• Social media integration</li>
                    <li>• Campaign effectiveness tracking</li>
                    <li>• Cross-site tracking (with consent)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may use third-party services that place cookies on your device. These services help us provide better functionality and analytics:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Analytics Services</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Google Analytics</li>
                    <li>• Hotjar</li>
                    <li>• Mixpanel</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Advertising Services</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Google Ads</li>
                    <li>• Facebook Pixel</li>
                    <li>• LinkedIn Insights</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Browser Settings</h3>
                <p className="text-gray-700 mb-4">
                  You can control and manage cookies through your browser settings. Here's how to access cookie settings in popular browsers:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Chrome</h4>
                    <p className="text-gray-700 text-sm">Settings → Privacy and Security → Cookies and other site data</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Firefox</h4>
                    <p className="text-gray-700 text-sm">Options → Privacy & Security → Cookies and Site Data</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Safari</h4>
                    <p className="text-gray-700 text-sm">Preferences → Privacy → Manage Website Data</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Edge</h4>
                    <p className="text-gray-700 text-sm">Settings → Cookies and site permissions → Cookies and site data</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Consent</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you first visit our website, you'll see a cookie consent banner that allows you to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Accept all cookies for the best experience</li>
                <li>Customize your cookie preferences</li>
                <li>Reject non-essential cookies</li>
                <li>Learn more about our cookie practices</li>
              </ul>
              <div className="bg-yellow-50 rounded-xl p-4 mt-4">
                <p className="text-gray-700 text-sm">
                  <strong>Note:</strong> Essential cookies cannot be disabled as they are necessary for basic website functionality. 
                  Disabling other types of cookies may affect your browsing experience.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Retention Period</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Cookie Type</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Retention Period</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Session Cookies</td>
                      <td className="border border-gray-300 px-4 py-3">Until browser closes</td>
                      <td className="border border-gray-300 px-4 py-3">Basic functionality</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Preference Cookies</td>
                      <td className="border border-gray-300 px-4 py-3">1 year</td>
                      <td className="border border-gray-300 px-4 py-3">User preferences</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Analytics Cookies</td>
                      <td className="border border-gray-300 px-4 py-3">2 years</td>
                      <td className="border border-gray-300 px-4 py-3">Website analytics</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Marketing Cookies</td>
                      <td className="border border-gray-300 px-4 py-3">90 days</td>
                      <td className="border border-gray-300 px-4 py-3">Advertising</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. 
                We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Posting the updated policy on this page</li>
                <li>Updating the "Last updated" date</li>
                <li>Showing a notification on our website</li>
                <li>Sending an email to registered users (for significant changes)</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Address:</strong> Shadara, Delhi, 110095</p>
                  <p><strong>Phone:</strong> +91 8797223004</p>
                  <p><strong>Email:</strong> privacy@shophub.com</p>
                  <p><strong>Website:</strong> www.shophub.com</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-gray-600 text-sm">
                This Cookie Policy is effective as of January 2024. By continuing to use our website, 
                you acknowledge that you have read and understood this Cookie Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies; 