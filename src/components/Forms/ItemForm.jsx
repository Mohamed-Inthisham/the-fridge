import React, { useState, useEffect } from 'react';
import { createItem, updateItem } from '../../services/itemService';
import './ItemForm.scss';

// Add 'showToast' to props
const ItemForm = ({ onSuccess, editingItem, onCancelEdit, showToast }) => {
  const [title, setTitle] = useState('');
  const [expiry, setExpiry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      // Logic to handle YYYY-MM-DD format
      if (editingItem.expiry) {
        const rawDate = editingItem.expiry.replace(/\//g, '-'); 
        const parts = rawDate.split('-');
        let formattedDate = '';
        if (parts[0].length === 4) {
          formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}`;
        } else {
          formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        setExpiry(formattedDate);
      }
    } else {
      setTitle('');
      setExpiry('');
    }
  }, [editingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !expiry) {
        // Use Toast for validation error
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
        showToast("Item updated successfully!", "success"); // <--- TOAST
      } else {
        await createItem(payload);
        showToast("Item added successfully!", "success"); // <--- TOAST
      }

      setTitle('');
      setExpiry('');
      onSuccess(); 
      
    } catch (error) {
      console.error(error);
      showToast("Operation failed. Try again.", "error"); // <--- TOAST
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="item-form">
      <form className="item-form__row" onSubmit={handleSubmit}>
        
        <div className="item-form__group item-form__group--name">
          <label className="item-form__label">🍉 Item Name</label>
          <input 
            type="text" 
            className="item-form__input" 
            placeholder="e.g. Banana"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="item-form__group item-form__group--date">
          <label className="item-form__label">⏰ Expiry Date</label>
          <input 
            type="date" 
            className="item-form__input"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button type="submit" className="item-form__button" disabled={isSubmitting}>
            {isSubmitting ? 'SAVING...' : (editingItem ? 'UPDATE ITEM' : 'ADD TO FRIDGE')}
          </button>

          {editingItem && (
             <button 
               type="button" 
               onClick={onCancelEdit}
               className="h-[48px] px-4 rounded border border-red-200 text-red-500 font-bold hover:bg-red-50"
             >
               CANCEL
             </button>
          )}
        </div>

      </form>
      
      {!editingItem && (
        <p className="item-form__warning">
          ⚠️ We Don't Want More Than One Piece Of The Same Food In Our Fridge.
        </p>
      )}
    </div>
  );
};

export default ItemForm;