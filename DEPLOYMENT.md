# 🚀 Deployment Guide - Fix Mobile & CORS Issues

## Problem
Your frontend deployed on Vercel works on desktop but not on mobile, and MongoDB data is not being fetched. This is due to:
1. **CORS issues** - Backend not allowing requests from Vercel domain
2. **HTTPS/HTTP mismatch** - Mobile browsers are stricter about mixed content
3. **Hardcoded localhost URLs** - Frontend trying to call localhost from production

## ✅ Solutions Applied

### 1. Backend CORS Configuration (Fixed)
- Updated `backend/server.js` with flexible CORS configuration
- Added support for multiple Vercel domains
- Added proper headers for mobile compatibility

### 2. Frontend API Configuration (Fixed)
- Created `frontend/src/config/api.js` for environment-based API URLs
- Updated `AuthContext.jsx` to use dynamic API base URL
- Added Vercel configuration file

### 3. Environment Variables Setup

#### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-app.vercel.app
```

#### Frontend (Vercel Environment Variables)
In Vercel dashboard → Settings → Environment Variables:
```
VITE_API_URL=https://your-backend-domain.com/api
```

## 🔧 Deployment Steps

### Step 1: Deploy Backend
1. Deploy your backend to a service like:
   - **Railway** (recommended)
   - **Render**
   - **Heroku**
   - **DigitalOcean App Platform**

2. Get your backend URL (e.g., `https://your-app.railway.app`)

### Step 2: Update CORS in Backend
In `backend/server.js`, update the allowed origins:
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173', 
  'http://localhost:4173',
  'https://your-app.vercel.app', // Your actual Vercel domain
  'https://your-app-name.vercel.app' // Any other Vercel domains
];
```

### Step 3: Set Frontend Environment Variables
In Vercel dashboard:
1. Go to your project → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-backend-domain.com/api`
3. Redeploy your frontend

### Step 4: Test
1. **Desktop**: Should work as before
2. **Mobile**: Should now work properly
3. **API Calls**: Should fetch data from your deployed backend

## 🐛 Troubleshooting

### If still not working:

1. **Check Browser Console** (mobile):
   - Open Chrome DevTools → More tools → Remote devices
   - Connect your phone and check console errors

2. **Verify CORS**:
   - Check if your backend domain is in the allowed origins
   - Ensure backend is accessible via HTTPS

3. **Check Environment Variables**:
   - Verify `VITE_API_URL` is set in Vercel
   - Ensure backend URL is correct and accessible

4. **Test API Directly**:
   ```bash
   curl -H "Origin: https://your-app.vercel.app" \
        -H "Access-Control-Request-Method: GET" \
        -H "Access-Control-Request-Headers: Content-Type" \
        -X OPTIONS https://your-backend-domain.com/api/products
   ```

## 📱 Mobile-Specific Fixes

### 1. HTTPS Only
- Ensure both frontend and backend use HTTPS
- Mobile browsers block mixed content (HTTP/HTTPS)

### 2. User Agent Headers
- Mobile browsers send different user agents
- CORS configuration now handles this properly

### 3. Network Timeouts
- Mobile networks can be slower
- Added proper timeout handling

## 🔒 Security Notes

1. **Environment Variables**: Never commit `.env` files
2. **CORS**: Only allow necessary origins in production
3. **HTTPS**: Always use HTTPS in production
4. **API Keys**: Keep backend API keys secure

## 📞 Support

If you're still having issues:
1. Check the browser console for specific errors
2. Verify your backend is running and accessible
3. Test API endpoints directly with tools like Postman
4. Ensure all environment variables are set correctly

---

**🎉 After following these steps, your app should work perfectly on both desktop and mobile!** 