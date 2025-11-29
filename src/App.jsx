import { useEffect, useState, useCallback } from 'react';
import ItemForm from './components/Forms/ItemForm';
import FridgeItem from './components/FridgeList/FridgeItem';
import ConfirmModal from './components/Modal/ConfirmModal'; 
import Toast from './components/Toast/Toast';
import { getAllItems, deleteItem } from './services/itemService'; 
import './App.scss';

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Edit State
  const [editingItem, setEditingItem] = useState(null);

  // Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // ✅ Reliable show toast
  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });

    // ✅ Auto hide after 3s from parent (extra safety)
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  }, []);

  // ✅ Reliable hide toast using functional update
  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  // Fetch Items
  const fetchData = useCallback(async () => {
    if (items.length === 0) setIsLoading(true);
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items", error);
      showToast("Failed to load items.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [items, showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Edit Click
  const handleEditClick = (item) => {
    setEditingItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  // Delete Click
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteItem(itemToDelete._id);
      setIsModalOpen(false);
      setItemToDelete(null);

      if (editingItem?._id === itemToDelete._id) {
        setEditingItem(null);
      }

      fetchData();
      showToast("Item deleted successfully!", "success");

    } catch {
      // ✅ Correct usage: pass "error" as type
      showToast("Failed to delete item.", "error");
      setIsModalOpen(false);
    }
  };

  const handleFormSuccess = () => {
    setEditingItem(null);
    fetchData();
  };

  return (
    <div className="relative min-h-screen pb-20">
      
      {/* ✅ Toast will unmount properly */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}

      <div className="absolute top-0 left-0 w-full h-[340px] bg-white z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto pt-12 px-4">
        <header className="text-center mb-10">
          <h1 className="app-title text-center mb-10">Good Morning, Johny!</h1>
          <p className="app-subtitle text-center mb-10">⛅ It's better to go shopping before this friday</p>
        </header>

        <ItemForm 
          onSuccess={handleFormSuccess}
          editingItem={editingItem}
          onCancelEdit={handleCancelEdit}
          showToast={showToast}
        />

        <div className="flex justify-end mb-4 mt-8 mx-7">
          <span className="text-fridge-dark font-bold text-sm">
            Total items — {items.length.toString().padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {isLoading ? (
            <p className="loading-text text-center mt-5">... <br /><br /> Loading fridge items</p>
          ) : (
            items.map((item) => (
              <FridgeItem 
                key={item._id}
                item={item}
                onDelete={() => handleDeleteClick(item)}
                onEdit={handleEditClick}
              />
            ))
          )}
        </div>
      </div>

      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.title}
      />
    </div>
  );
}

export default App;
