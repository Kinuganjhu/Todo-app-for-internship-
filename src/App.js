import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Load items from localStorage when the component mounts
  useEffect(() => {
    const storedItems = localStorage.getItem('tasks');
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        setItems(parsedItems);
      } catch (error) {
        console.error('Failed to parse items from localStorage:', error);
      }
    }
  }, []);

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(items));
  }, [items]);

  const handleAddTask = () => {
    if (text.trim() !== '') {
      if (editIndex !== null) {
        const updatedItems = items.map((item, index) =>
          index === editIndex ? text : item
        );
        setItems(updatedItems);
        setEditIndex(null);
      } else {
        setItems([...items, text]);
      }
      setText('');
    } else {
      console.warn('Task text is empty. Task not added.');
    }
  };

  const handleDeleteTask = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleEditTask = (index) => {
    setText(items[index]);
    setEditIndex(index);
  };

  return (
    <div className="App">
      <h1>TO-DO APP</h1>
      <div>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Enter a new task" 
        />
        <button onClick={handleAddTask}>
          {editIndex !== null ? 'Save Task' : 'Add Task'}
        </button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            {editIndex === index && (
              <>
                <button onClick={handleAddTask}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </>
            )}
            {editIndex !== index && (
              <>
                <button onClick={() => handleEditTask(index)}>Edit</button>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
