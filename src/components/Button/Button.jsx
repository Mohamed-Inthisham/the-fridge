import React from 'react';
import './Button.scss';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  isLoading = false,
  disabled = false, 
  onClick, 
  className = '' 
}) => {
  return (
    <button 
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        app-button 
        app-button--${variant} 
        flex items-center justify-center 
        transition-all duration-200 ease-in-out
        ${className} 
      `}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
           <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
           <span>SAVING...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;