// src/components/Toast/Toast.jsx
import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    // Automatically close after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Styles based on type
  const bgClass = type === 'error' ? 'bg-red-500' : 'bg-green-600';
  const icon = type === 'error' ? '⚠️' : '✅';

  return (
    <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all animate-bounce ${bgClass}`}>
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  );
};

export default Toast;