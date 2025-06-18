import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user, isAuthenticated } = useAuth();

  // Get user-specific storage key
  const getStorageKey = () => {
    return isAuthenticated && user ? `wishlist_${user._id}` : 'wishlist_guest';
  };

  // Load wishlist from localStorage on mount or when user changes
  useEffect(() => {
    const storageKey = getStorageKey();
    const savedWishlist = localStorage.getItem(storageKey);
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    } else {
      setWishlist([]); // Clear wishlist when switching users
    }
  }, [user, isAuthenticated]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [wishlist, user, isAuthenticated]);

  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      const existingItem = prevWishlist.find(item => item._id === product._id);
      
      if (existingItem) {
        return prevWishlist; // Already in wishlist
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}; 