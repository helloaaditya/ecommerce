const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 999.99,
    images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'],
    category: 'Electronics',
    stock: 50,
    ratings: 4.8,
    numOfReviews: 125
  },
  {
    name: 'Samsung Galaxy S24',
    description: 'Premium Android smartphone with AI features and stunning display',
    price: 899.99,
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500'],
    category: 'Electronics',
    stock: 45,
    ratings: 4.7,
    numOfReviews: 98
  },
  {
    name: 'MacBook Air M3',
    description: 'Ultra-thin laptop with M3 chip for incredible performance',
    price: 1199.99,
    images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500'],
    category: 'Electronics',
    stock: 30,
    ratings: 4.9,
    numOfReviews: 87
  },
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Air Max technology',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    category: 'Sports',
    stock: 100,
    ratings: 4.6,
    numOfReviews: 234
  },
  {
    name: 'Adidas Ultraboost 22',
    description: 'Premium running shoes with responsive cushioning',
    price: 179.99,
    images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500'],
    category: 'Sports',
    stock: 75,
    ratings: 4.7,
    numOfReviews: 156
  },
  {
    name: 'Levi\'s 501 Jeans',
    description: 'Classic straight-fit jeans in dark wash denim',
    price: 89.99,
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'],
    category: 'Clothing',
    stock: 200,
    ratings: 4.5,
    numOfReviews: 312
  },
  {
    name: 'Uniqlo Cotton T-Shirt',
    description: 'Soft cotton t-shirt in various colors',
    price: 19.99,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
    category: 'Clothing',
    stock: 500,
    ratings: 4.3,
    numOfReviews: 445
  },
  {
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald',
    price: 12.99,
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'],
    category: 'Books',
    stock: 150,
    ratings: 4.8,
    numOfReviews: 567
  },
  {
    name: 'Harry Potter and the Sorcerer\'s Stone',
    description: 'First book in the magical Harry Potter series',
    price: 15.99,
    images: ['https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?w=500'],
    category: 'Books',
    stock: 300,
    ratings: 4.9,
    numOfReviews: 892
  },
  {
    name: 'IKEA MALM Bed Frame',
    description: 'Modern bed frame with storage drawers',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500'],
    category: 'Home',
    stock: 25,
    ratings: 4.4,
    numOfReviews: 78
  },
  {
    name: 'Philips Hue Smart Bulb',
    description: 'Color-changing smart LED bulb with app control',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'],
    category: 'Home',
    stock: 80,
    ratings: 4.6,
    numOfReviews: 134
  },
  {
    name: 'L\'Oreal Paris Foundation',
    description: 'Long-lasting foundation with natural finish',
    price: 24.99,
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500'],
    category: 'Beauty',
    stock: 120,
    ratings: 4.5,
    numOfReviews: 267
  },
  {
    name: 'Maybelline Mascara',
    description: 'Volumizing mascara for dramatic lashes',
    price: 12.99,
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500'],
    category: 'Beauty',
    stock: 200,
    ratings: 4.4,
    numOfReviews: 189
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Premium noise-cancelling wireless headphones',
    price: 399.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    category: 'Electronics',
    stock: 40,
    ratings: 4.8,
    numOfReviews: 203
  },
  {
    name: 'Kindle Paperwhite',
    description: 'Waterproof e-reader with adjustable backlight',
    price: 139.99,
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500'],
    category: 'Electronics',
    stock: 60,
    ratings: 4.7,
    numOfReviews: 145
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Create a default user for the products (you'll need to replace this with a real user ID)
    const defaultUserId = new mongoose.Types.ObjectId();

    // Add products with the default user
    const productsWithUser = sampleProducts.map(product => ({
      ...product,
      createdBy: defaultUserId
    }));

    await Product.insertMany(productsWithUser);
    console.log(`Seeded ${sampleProducts.length} products successfully`);

    // Create text index
    await Product.collection.createIndex({ name: 'text', description: 'text' });
    console.log('Text index created for search functionality');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts(); 