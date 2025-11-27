import React, { useState, useEffect } from 'react';
import { createItem, updateItem } from '../../services/itemService';
import Button from '../Button/Button'; 
import './ItemForm.scss';

const ItemForm = ({ onSuccess, editingItem, onCancelEdit, showToast }) => {
  const [title, setTitle] = useState('');
  const [expiry, setExpiry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 1. Load Data for Editing ---
  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      if (editingItem.expiry) {
        const rawDate = editingItem.expiry.replace(/\//g, '-'); 
        const parts = rawDate.split('-');
        const formattedDate = parts[0].length === 4 
          ? `${parts[0]}-${parts[1]}-${parts[2]}` 
          : `${parts[2]}-${parts[1]}-${parts[0]}`;
        setExpiry(formattedDate);
      }
    } else {
      resetForm();
    }
  }, [editingItem]);

  const resetForm = () => {
    setTitle('');
    setExpiry('');
  };

  // --- 2. Handle Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !expiry) {
        showToast("Please fill in both fields", "error"); 
        return;
    }
    setIsSubmitting(true);
    try {
      const [year, month, day] = expiry.split('-');
      const apiDate = `${day}/${month}/${year}`;
      const payload = { title, expiry: apiDate };

      if (editingItem) {
        await updateItem(editingItem._id, payload);
        showToast("Item updated successfully!", "success");
      } else {
        await createItem(payload);
        showToast("Item added successfully!", "success");
      }
      resetForm();
      onSuccess(); 
    } catch (error) {
      console.error(error);
      showToast("Operation failed. Try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="item-form-card w-full max-w-[934px] mx-auto">
      
      {/* 
         Structure Change: 
         We treat the form as a column to stack "Main Row" and "Cancel Row" 
      */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        
        {/* --- ROW 1: Inputs + Update Button --- */}
        <div className="flex flex-col md:flex-row gap-5 items-end">
          
          {/* Field 1: Name */}
          <div className="flex-[1.5] w-full flex flex-col">
            <label className="item-form-card__label mb-2">🍉 Item Name</label>
            <input 
              type="text" 
              className="item-form-card__input w-full" 
              placeholder="e.g. Banana"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Field 2: Date */}
          <div className="flex-1 w-full flex flex-col">
            <label className="item-form-card__label mb-2">⏰ Expiry Date</label>
            <input 
              type="date" 
              className="item-form-card__input w-full"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>

          {/* UPDATE BUTTON (Stays aligned with inputs) */}
          <div className="w-full md:w-auto">
            <Button 
              type="submit" 
              variant="primary"
              isLoading={isSubmitting} 
              className="w-full md:w-auto min-w-[150px]"
            >
              {editingItem ? 'UPDATE ITEM' : 'ADD TO FRIDGE'}
            </Button>
          </div>
        </div>

        {/* --- ROW 2: Cancel Button (Only appears below Update Item) --- */}
        {editingItem && (
           <div className="flex justify-end w-full">
             <Button 
               type="button" 
               variant="secondary" 
               onClick={onCancelEdit}
               className="w-full md:w-auto min-w-[150px]"
             >
               CANCEL
             </Button>
           </div>
        )}

      </form>
      
      {/* Footer Message */}
      {!editingItem && (
        <p className="item-form-card__warning mt-4">
          ⚠️ We Don't Want More Than One Piece Of The Same Food In Our Fridge.
        </p>
      )}
    </div>
  );
};

export default ItemForm;