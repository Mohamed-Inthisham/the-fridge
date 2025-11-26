import  { useEffect, useState } from 'react';
import ItemForm from './components/Forms/ItemForm';
import FridgeItem from './components/FridgeList/FridgeItem';
import ConfirmModal from './components/Modal/ConfirmModal'; 
import Toast from './components/Toast/Toast'; // <--- Import Toast
import { getAllItems, deleteItem } from './services/itemService'; 
import './App.scss'; // Import the styles

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Edit State
  const [editingItem, setEditingItem] = useState(null);

  // --- NEW: TOAST STATE ---
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Helper to show toast
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Helper to hide toast
  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  // Fetch Data
  const fetchData = async () => {
    if(items.length === 0) setIsLoading(true);
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- HANDLERS ---

  const handleFormSuccess = () => {
    setEditingItem(null); 
    fetchData();          
  };

  const handleEditClick = (item) => {
    setEditingItem(item); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

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
      showToast("Item deleted successfully!", "success"); // <--- SHOW TOAST HERE
      
    } catch (error) {
      showToast("Failed to delete item.", error); // <--- SHOW ERROR TOAST
      setIsModalOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen pb-20">
      
      {/* TOAST COMPONENT */}
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

        {/* Pass showToast to the Form */}
        <ItemForm 
          onSuccess={handleFormSuccess} 
          editingItem={editingItem}        
          onCancelEdit={handleCancelEdit}
          showToast={showToast}  // <--- PASS THE FUNCTION
        />

        <div className="flex justify-end mb-4 mt-8">
            <span className="text-[#0A3456] font-bold text-sm">
              Total items — {items.length.toString().padStart(2, '0')}
            </span>
        </div>

        <div className="flex flex-col gap-2">
          {isLoading ? (
            <p className="text-center text-[#00598D] mt-10">... <br /> Loading fridge items</p>
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