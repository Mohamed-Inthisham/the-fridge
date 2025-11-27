import React from 'react';
import { calculateStatus } from '../../services/dateUtils';
import Badge from '../Badge/Badge'; 
import './FridgeItem.scss';

const FridgeItem = ({ item, onDelete, onEdit }) => {
  const status = calculateStatus(item.expiry);

  return (
    <div 
      className="fridge-item flex items-center justify-between" 
      onClick={() => onEdit(item)} 
    >
      
      {/* LEFT SIDE: Name & Date */}
      <div className="flex items-center flex-1">
        
        {/* 1. Name Column - Fixed Width (e.g., 220px) 
            This ensures the Date always starts at the exact same vertical line. */}
        <div className="w-[220px] flex-shrink-0 pr-4">
          <span className="fridge-item__title truncate block" title={item.title}>
            {item.title}
          </span>
        </div>

        {/* 2. Date Column */}
        <div className="hidden md:flex items-center">
          <span className="fridge-item__label">Expiry date —</span>
          <span className="fridge-item__date ml-1">{item.expiry}</span>
        </div>
      </div>

      {/* RIGHT SIDE: Badge & Delete */}
      <div className="flex items-center gap-6">
        
        {/* 3. Badge Component */}
        <Badge status={status} />

        {/* 4. Delete Action (SVG Icon) */}
        <button 
          className="fridge-item__delete-btn" 
          onClick={(e) => {
            e.stopPropagation(); // Stop click from opening Edit mode
            onDelete(item._id);
          }} 
          title="Delete Item"
        >
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.2H2.6M2.6 4.2H13M2.6 4.2V15.4C2.6 15.8243 2.76857 16.2313 3.06863 16.5314C3.36869 16.8314 3.77565 17 4.2 17H9.8C10.2243 17 10.6313 16.8314 10.9314 16.5314C11.2314 16.2313 11.4 15.8243 11.4 15.4V4.2M5 4.2V2.6C5 2.17565 5.16857 1.76869 5.46863 1.46863C5.76869 1.16857 6.17565 1 6.6 1H7.4C7.82435 1 8.23131 1.16857 8.53137 1.46863C8.83143 1.76869 9 2.17565 9 2.6V4.2M5.8 8.2V13M8.2 8.2V13" stroke="#2C3A57" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

    </div>
  );
};

export default FridgeItem;