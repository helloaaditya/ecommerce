import React, { createContext, useContext, useState, useCallback } from 'react';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });

  const showPopup = useCallback((message, type = 'success') => {
    setPopup({ show: true, message, type });
  }, []);

  const closePopup = useCallback(() => {
    setPopup((prev) => ({ ...prev, show: false }));
  }, []);

  return (
    <PopupContext.Provider value={{ popup, showPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
}; 