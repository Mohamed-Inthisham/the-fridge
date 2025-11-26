// src/components/Modal/ConfirmModal.jsx
import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    // 1. Backdrop (Dark background)
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      
      {/* 2. Modal Content (White Box) */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 transform transition-all scale-100">
        
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <span className="text-2xl">🗑️</span>
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Delete Item?
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Are you sure you want to remove <strong>{itemName}</strong> from your fridge? This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;