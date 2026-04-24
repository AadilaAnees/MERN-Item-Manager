import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  // Separate states for our fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(1);

  const API_URL = 'https://mern-item-manager-nu4w.onrender.com';

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      await axios.post(API_URL, { name, category, quantity });
      // Reset fields
      setName('');
      setCategory('');
      setQuantity(1);
      fetchItems(); 
    } catch (err) {
      alert("Check if your backend is running!");
    }
  };

  // Add these functions inside your App() component, near the addItem function

// 1. Delete an item
const deleteItem = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/items/${id}`);
    fetchItems(); // Refresh the list
  } catch (err) {
    console.error("Delete failed", err);
  }
};

// 2. Update an item (Example: Restock +5)
const restockItem = async (id, currentQuantity) => {
  try {
    await axios.put(`http://localhost:5000/items/${id}`, { 
      quantity: Number(currentQuantity) + 5 
    });
    fetchItems(); // Refresh the list
  } catch (err) {
    console.error("Update failed", err);
  }
};

// --- In your return (Table section) ---
// Add an "Actions" column to your table


  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>📦 Item Manager Pro</h1>
      
      <form onSubmit={addItem} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '20px' }}>
        <h3>Add New Item</h3>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /><br/><br/>
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required /><br/><br/>
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} /><br/><br/>
        <button type="submit">Add to Inventory</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => restockItem(item._id, item.quantity)} style={{ marginRight: '10px', color: 'blue' }}>
                  Restock (+5)
                  </button>
                  <button onClick={() => deleteItem(item._id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    
  );
}

export default App;