import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, EnvelopeIcon, CheckCircleIcon, ExclamationTriangleIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [resetUrl, setResetUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setResetUrl('');

    try {
      const response = await axios.post('/auth/forgot-password', { email });
      setIsSuccess(true);
      
      if (response.data.data?.resetUrl) {
        // Email failed but we have the reset URL for development
        setMessage('Email service is not configured. Here is your password reset link:');
        setResetUrl(response.data.data.resetUrl);
      } else {
        setMessage('Password reset link has been sent to your email address. Please check your inbox and follow the instructions.');
      }
    } catch (error) {
      setIsSuccess(false);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(resetUrl);
      alert('Reset link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Back to Login Link */}
        <Link
          to="/login"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Login</span>
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <EnvelopeIcon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
            <p className="text-gray-600">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Success Message */}
          {isSuccess && message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <div className="flex-1">
                  <p className="text-green-800 text-sm">{message}</p>
                  
                  {/* Reset URL for development */}
                  {resetUrl && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-800 text-xs font-medium mb-2">Development Reset Link:</p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={resetUrl}
                          readOnly
                          className="flex-1 text-xs bg-white border border-blue-300 rounded px-2 py-1 text-blue-900"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                          title="Copy to clipboard"
                        >
                          <DocumentDuplicateIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-blue-600 text-xs mt-2">
                        Click the copy button above, then paste the link in your browser to reset your password.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {!isSuccess && message && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-3" />
                <p className="text-red-800 text-sm">{message}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending Reset Link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-gray-600 text-sm">
              Remember your password?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                Sign in here
              </Link>
            </p>
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">Need Help?</h3>
            <p className="text-gray-600 text-sm mb-3">
              If you're having trouble resetting your password, contact our support team:
            </p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>📧 support@shophub.com</p>
              <p>📞 +91 8797223004</p>
            </div>
          </div>

          {/* Development Notice */}
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-xs">
              <strong>Development Mode:</strong> Email service is not configured. 
              Reset links will be displayed directly on this page for testing purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 