import React from 'react';
import { calculateStatus } from '../../services/dateUtils';
import Badge from '../Badge/Badge'; // Import the new reusable component
import './FridgeItem.scss';

const FridgeItem = ({ item, onDelete, onEdit }) => {
  // Get status string (e.g., "Healthy")
  const status = calculateStatus(item.expiry);

  return (
    <div 
      className="fridge-item flex items-center justify-between" 
      onClick={() => onEdit(item)} 
      title="Click to Edit"
    >
      
      {/* 1. Item Details */}
      <div className="flex-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
        <span className="fridge-item__title font-bold text-lg">
          {item.title}
        </span>
        
        {/* Mobile Date */}
        <span className="md:hidden text-xs text-gray-400">
          {item.expiry}
        </span>

        {/* Desktop Date */}
        <span className="fridge-item__date hidden md:block text-sm text-gray-500">
          Expiry date — {item.expiry}
        </span>
      </div>

      {/* 2. Reusable Badge Component */}
      <div className="mr-4">
        <Badge status={status} />
      </div>

      {/* 3. Delete Action */}
      <button 
        className="fridge-item__delete-btn" 
        onClick={(e) => {
          e.stopPropagation(); // Stop click from triggering "Edit"
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