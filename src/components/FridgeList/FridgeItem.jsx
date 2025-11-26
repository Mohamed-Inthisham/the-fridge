import React from 'react';
import { calculateStatus } from '../../services/dateUtils';
import './FridgeItem.scss';

const FridgeItem = ({ item, onDelete, onEdit }) => {
  const status = calculateStatus(item.expiry);
  const statusClass = status.toLowerCase().replace(' ', '-');

  return (
    // 1. CLICK THE WHOLE ROW TO EDIT
    <div 
      className="fridge-item" 
      onClick={() => onEdit(item)} 
      title="Click to Edit"
    >
      
      {/* Name */}
      <div className="flex-1">
        <span className="fridge-item__title block">{item.title}</span>
        <span className="md:hidden text-xs text-gray-400">{item.expiry}</span>
      </div>

      {/* Date */}
      <span className="fridge-item__date hidden md:block">
        Expiry date — {item.expiry}
      </span>

      {/* Status Badge */}
      <div className="fridge-item__badge-container">
        <span className={`fridge-item__badge fridge-item__badge--${statusClass}`}>
          {status}
        </span>
      </div>

      {/* 2. DELETE BUTTON */}
      <button 
        className="fridge-item__delete" 
        onClick={(e) => {
          // CRITICAL: Stop the click from bubbling up to the row
          e.stopPropagation(); 
          onDelete(item._id);
        }} 
        title="Delete Item"
      >
        🗑️
      </button>

    </div>
  );
};

export default FridgeItem;