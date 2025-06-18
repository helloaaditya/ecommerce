# E-commerce Backend

A Node.js/Express backend for the ShopHub e-commerce platform.

## Features

- User authentication (register, login, forgot password)
- Product management
- Order management
- Email notifications
- Password reset functionality

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the backend directory with the following variables:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/ecommerce

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # Frontend URL
   FRONTEND_URL=http://localhost:5173

   # Email Configuration (Gmail)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

3. For Gmail email setup:
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password
   - Use the App Password in EMAIL_PASS instead of your regular password

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `GET /api/auth/reset-password/:token` - Validate reset token
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/me` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `GET /api/orders` - Get user orders (protected)
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/:id` - Get single order (protected)

## Password Reset Flow

1. User requests password reset via `/forgot-password` page
2. System generates a secure token and sends email
3. User clicks link in email to go to `/reset-password/:token`
4. User enters new password and submits
5. System validates token and updates password
6. User is redirected to login page

## Email Templates

The system includes:
- Welcome email for new registrations
- Password reset email with secure link

Both emails are professionally designed with ShopHub branding.

## Project Structure

```
backend/
├── server.js          # Main server file
├── routes/            # API routes
│   └── products.js    # Product routes
├── models/            # Database models (future)
├── controllers/       # Route controllers (future)
├── middleware/        # Custom middleware (future)
└── package.json
``` 