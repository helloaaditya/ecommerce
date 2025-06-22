import React, { useEffect } from 'react';
import { usePopup } from '../context/PopupContext';

const Popup = () => {
  const { popup, closePopup } = usePopup();

  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(closePopup, 2500);
      return () => clearTimeout(timer);
    }
  }, [popup.show, closePopup]);

  if (!popup.show) return null;

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg flex items-center space-x-2
      ${popup.type === 'success' ? 'bg-green-600 text-white' : 'bg-yellow-500 text-white'}`}
    >
      <span>{popup.message}</span>
      <button onClick={closePopup} className="ml-2 text-lg font-bold focus:outline-none">&times;</button>
    </div>
  );
};

export default Popup; 