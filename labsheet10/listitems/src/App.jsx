import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([
    { id: 1, text: "Milk" },
    { id: 2, text: "Bread" },
    { id: 3, text: "Eggs" },
  ]);

  const [newItem, setNewItem] = useState("");

  // Add item
  const handleAddItem = () => {
    if (newItem.trim() === "") return;

    const item = {
      id: Date.now(),
      text: newItem,
    };

    setItems([...items, item]);
    setNewItem("");
  };

  // Remove item
  const handleRemoveItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div className="container">
      <h2>Shopping List</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      {items.length === 0 ? (
        <p className="empty-message">No items available. Add some items!</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              <span>{item.text}</span>
              <button
                className="remove-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;