import React, { useState } from 'react';
import styled from 'styled-components';
// import _ from 'lodash';
import './App.css';

function App() {

  const [completed, setCompleted] = useState('');
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    text: '',
    key: '',
    isCompleted: false
  })


  const addItem = (e) => {
    e.preventDefault();
    if(currentItem.text !== '') {
      const newItems = [...items, currentItem];
      setItems(newItems);
      setCurrentItem({
        text: '',
        key: '',
        isCompleted: false
      })
    }
  };

  const handleInput = (e) => {
    setCurrentItem({
      text: e.target.value,
      key: Date.now(),
      isCompleted: false
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

  const isCompleted = (key) => {
    console.log('key of isCompleted', key)
    let selectedItems = items.map(item => {
      if(item.key === key) {
        item.isCompleted = !item.isCompleted;
      }
      console.log(item, 'item of selectItems')
      return item;
    })

    setItems(selectedItems);
  };

  // const filterCompleted = (e) => {
  //   console.log(e.target.value)
  //   setCompleted(e.target.value)
  // }

  const listItems = items.filter(item => {
    if(completed === 'true') {
      return item.isCompleted === true;
    } else {
      return item.isCompleted === false;
    }
  }).map((item) => {
      return (
        <StyledDiv2 key={item.key}>
          <StyledP1>
            <StyledInput1
              type='text'
              value={item.text}
              onChange={(e) => setUpdate(e.target.value, item.key)}
            />
            <span>
              <button onClick={() => deleteItem(item.key)}>Delete</button>
            </span>
            <span>
              <button onClick={() => isCompleted(item.key)}>Completed</button>
            </span>
          </StyledP1>
        </StyledDiv2>
    )
  });

  return (
    <StyledDiv1 className="app">
      <select onChange={(e) => setCompleted(e.target.value)}>
        <option value='false'>Not Completed</option>
        <option value='true'>Completed</option>
      </select>
      <form onSubmit={addItem}>
        <StyledDiv4>
          <StyledP1>
          <input
            type='text'
            placeholder='Enter Text'
            value={currentItem.text}
            onChange={handleInput}
          />
          <span>
            <button>Add</button>
          </span>
          </StyledP1>
        </StyledDiv4>
      </form>
      <StyledDiv3>
        {listItems}
      </StyledDiv3>
    </StyledDiv1>
  );
}

export default App;

const StyledDiv1 = styled.div`
  border-radius: 8px;
  box-shadow: 10px 10px 50px 1px #0984e3;
  margin: 34px auto;
  max-width: 900px;
  height: 800px;
  padding: 20px;
  border: transparent;
  `;
  
const StyledDiv2 = styled.div`
  max-width: 572px;
  border-radius: 8px;
  border: 1px solid black;
  margin: 34px 30px;
  padding: 3px 3px;
  `;
  
  const StyledDiv3 = styled.div`
  border-radius: 8px;
  border: 1px solid black;
  margin: 34px auto;
  max-width: 635px;
  max-height: 596px;
  overflow: scroll;
  `;

  const StyledDiv4 = styled.div`
    max-width: 633px;
    border-radius: 8px;
    border: 1px solid black;
    margin: 34px auto;
    padding: 3px 3px;
    `;
  
  const StyledP1 = styled.p`
  text-align: center;
  min-width: 300px;
`;

const StyledInput1 = styled.input`
  min-width: 200px;
`;