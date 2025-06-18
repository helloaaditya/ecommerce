const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config();

const app = express();

// Simple CORS for mobile compatibility
app.use(cors({
  origin: '*', // Allow all origins for mobile
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  images: [String],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

// Simple User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI not found');
      return false;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    return false;
  }
};

// Test endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'E-commerce API is running!',
    timestamp: new Date().toISOString(),
    status: 'OK'
  });
});

// Products endpoint - most important for mobile
app.get('/products', async (req, res) => {
  try {
    console.log('📱 Products request received');
    
    // Connect to database
    const connected = await connectDB();
    if (!connected) {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed'
      });
    }
    
    // Get products with simple query
    const products = await Product.find({}).sort({ createdAt: -1 });
    
    console.log(`📱 Found ${products.length} products`);
    
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('📱 Products error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Single product endpoint
app.get('/products/:id', async (req, res) => {
  try {
    const connected = await connectDB();
    if (!connected) {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed'
      });
    }
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Simple auth endpoints
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const connected = await connectDB();
    if (!connected) {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed'
      });
    }
    
    const user = await User.findOne({ email });
    
    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const connected = await connectDB();
    if (!connected) {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed'
      });
    }
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }
    
    const user = await User.create({
      name,
      email,
      password
    });
    
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Admin endpoints
app.get('/auth/users', async (req, res) => {
  try {
    const connected = await connectDB();
    if (!connected) {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed'
      });
    }
    
    const users = await User.find({}).select('-password');
    
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Admin product management
app.post('/products', async (req, res) => {
  try {
    const connected = await connectDB();
    if (!connected) {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed'
      });
    }
    
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const connected = await connectDB();
    if (!connected) {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed'
      });
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const connected = await connectDB();
    if (!connected) {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed'
      });
    }
    
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Vercel serverless function handler
module.exports = async (req, res) => {
  console.log('🚀 API request:', req.method, req.url);
  
  // Handle the request
  return app(req, res);
}; 