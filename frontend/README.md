# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Deployment Instructions for Vercel

To deploy this frontend project to Vercel, follow these steps:

## 1. Set the Root Directory
- In the Vercel dashboard, go to your project settings.
- Under **General > Root Directory**, set it to `frontend`.
- Save the changes.

## 2. Set Build & Output Settings
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- These can be set in **Settings > Build & Development Settings** in the Vercel dashboard.

## 3. Set Environment Variables (if needed)
- If your app requires environment variables (e.g., `VITE_API_URL`), add them in **Settings > Environment Variables**.

## 4. Redeploy
- After making these changes, trigger a redeploy from the Vercel dashboard.

## 5. SPA Routing (vercel.json)
- The included `vercel.json` file ensures that client-side routing works correctly for your Vite React app.

---

If you encounter any build errors, check the Vercel deployment logs for details and resolve any missing dependencies or configuration issues.

# Environment Variables for Production

To use a custom backend API URL in production, set the environment variable `VITE_API_URL` in your Vercel project settings:

- Go to your project in the Vercel dashboard.
- Navigate to Settings > Environment Variables.
- Add `VITE_API_URL` and set its value to your deployed backend URL (e.g., https://your-backend.onrender.com/api).
- Redeploy your project after saving changes.

The frontend will automatically use this value for all API requests in production.

# Procedure followed *

1. **UI/UX Enhancements:**
   - Redesigned the Home page for a modern, interactive, and eye-catching e-commerce look.
   - Added animated text, parallax effects, and beautiful gradients.
   - Improved all section headings, buttons, and cards for clarity and engagement.

2. **Mobile Friendliness:**
   - Made the entire home page and all major sections fully responsive.
   - Used Tailwind CSS responsive classes to ensure proper alignment, font sizes, and spacing on all devices.
   - Ensured all grids collapse to single column and all buttons are full width on mobile.

3. **Global Popup Notification System:**
   - Implemented a global popup using React Context (`PopupContext`).
   - All cart and wishlist actions across the site now show success or login-required popups.
   - Popup auto-dismisses and can be closed manually.

4. **Consistent User Feedback:**
   - Added popups for add/remove cart, wishlist, and quantity updates on all relevant pages (Home, Products, ProductDetail, Wishlist, Cart).
   - Ensured users always get clear feedback for their actions, whether logged in or not.

5. **Code Refactoring:**
   - Centralized notification logic for maintainability and scalability.
   - Updated all relevant handlers to use the global popup system.

6. **Accessibility & Usability:**
   - Improved button sizes, touch targets, and color contrast for accessibility.
   - Ensured no horizontal scrolling or overflow on mobile.

---

For any further improvements or customizations, see the code comments or contact the project maintainer.
