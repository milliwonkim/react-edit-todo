import React, { useState } from 'react';
import './App.css';

function App() {

  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    text: '',
    key: ''
  })

  const addItem = (e) => {
    e.preventDefault();
    if(currentItem.text !== '') {
      const newItems = [...items, currentItem];
      setItems(newItems);
      console.log('items', items)
      setCurrentItem({
        text: '',
        key: ''
      })
    }
  };

  const handleInput = (e) => {
    setCurrentItem({
      text: e.target.value,
      key: Date.now(),
    })
  }

  const setUpdate = (text, key) => {
    console.log(text, 'text')
    console.log(items, 'items');

    let newItems = items.map(item => {
      if(item.key === key) {
        item.text = text;
        console.log(item, 'item')
      }
      return item;
    })

    setItems(newItems)
    console.log('updated items: ', items)
  }

  const deleteItem = (key) => {
    const filteredItems = items.filter(item => item.key !== key)
    setItems(filteredItems);
  }

  const listItems = items.map((item) => {
    return (
      <div key={item.key}>
          <input
            type='text'
            value={item.text}
            onChange={(e) => setUpdate(e.target.value, item.key)}
          />
          <button onClick={() => deleteItem(item.key)}>Delete</button>
      </div>
    )
  })

  return (
    <div className="app">
      <form onSubmit={addItem}>
        <input
          type='text'
          placeholder='Enter Text'
          value={currentItem.text}
          onChange={handleInput}
        />
        <button>Add</button>
      </form>
      {listItems}
    </div>
  );
}

export default App;
