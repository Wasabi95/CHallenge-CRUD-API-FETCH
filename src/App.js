// npm i axios
// This code fetches data from the JSONPlaceholder API and displays it in the list. The fetchItems function uses axios to make a GET request to the API and updates the items state with the response data.
// The handleAddItem, handleEditItem, and handleDeleteItem functions also use axios to make POST, PUT, and DELETE requests to the API, respectively.
// The useEffect hook runs fetchItems when the component mounts.

import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    setItems(response.data);
  };

  const handleAddItem = async (title, description) => {
    const newItem = { title, description };
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      newItem
    );
    setItems([...items, response.data]);
  };

  const handleEditItem = async (id, title, description) => {
    const updatedItem = { title, description };
    await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      updatedItem
    );
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, title, description };
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  };

  const handleDeleteItem = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button
              onClick={() =>
                handleEditItem(item.id, "New Title", "New Description")
              }
            >
              Edit
            </button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add Item</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleAddItem(
            event.target.elements.title.value,
            event.target.elements.description.value
          );
          event.target.reset();
        }}
      >
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="description" placeholder="Description" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
