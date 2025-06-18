# E-commerce Application

A full-stack e-commerce application with React frontend and Node.js backend.

## Project Structure

```
ecommerce-bootcamp/
├── frontend/          # React application
│   ├── src/          # Source code
│   ├── public/       # Public assets
│   ├── package.json  # Frontend dependencies
│   └── README.md     # Frontend documentation
├── backend/          # Node.js API server
│   ├── server.js     # Main server file
│   ├── routes/       # API routes
│   ├── package.json  # Backend dependencies
│   └── README.md     # Backend documentation
└── README.md         # This file
```

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:5000`

## Features

### Frontend
- React 19 with Vite
- Modern UI components
- Responsive design
- Product listing and details

### Backend
- Express.js REST API
- CORS enabled
- Product management (CRUD)
- Environment configuration
- Error handling

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Development

Both frontend and backend support hot reloading during development. Make sure to run both servers simultaneously for full functionality.

## Technologies Used

- **Frontend**: React, Vite, ESLint
- **Backend**: Node.js, Express, CORS, dotenv
- **Database**: MongoDB (configured but not implemented yet) 