import React, { useState } from 'react';
import styled from 'styled-components';
import Delete from './delete.svg';
import Check from './check.svg';
import Checklist from './checklist.svg';
import Close from './close.svg';
import Plus from './plus.svg';
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
    let selectedItems = items.map(item => {
      if(item.key === key) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    })

    setItems(selectedItems);
  };

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
            <StyledImg src={Delete} alt="delete" onClick={() => deleteItem(item.key)} />
            <StyledImg src={Check} alt='check' onClick={() => isCompleted(item.key)} />
          </StyledP1>
        </StyledDiv2>
    )
  });

  return (
    <StyledDiv1 className="app">
      <StyledDiv5>
        <StyledButton2><StyledImg src={Checklist} onClick={() => setCompleted('true')} /></StyledButton2>
        <StyledButton2><StyledImg src={Close} onClick={() => setCompleted('false')} /></StyledButton2>
      </StyledDiv5>
      <form onSubmit={addItem}>
        <StyledDiv4>
          <StyledP1>
          <StyledInput2
            type='text'
            placeholder='Enter Text'
            value={currentItem.text}
            onChange={handleInput}
          />
          <StyledButton1><StyledImg src={Plus} /></StyledButton1>
          {/* <button>Add</button> */}
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
  box-shadow: 10px 10px 50px 1px #636e72;
  margin: 34px auto;
  max-width: 900px;
  height: 800px;
  padding: 20px;
  border: transparent;
`;

const StyledDiv2 = styled.div`
  max-width: 572px;
  border-radius: 8px;
  border: transparent;
  margin: 34px 30px;
  padding: 3px 3px;
  box-shadow: 10px 10px 50px 1px #636e72;
`;

const StyledDiv3 = styled.div`
  border-radius: 8px;
  border: transparent;
  margin: 34px auto;
  max-width: 635px;
  height: 596px;
  overflow: scroll;
  box-shadow: 10px 10px 50px 1px #636e72
`;

const StyledDiv4 = styled.div`
  max-width: 633px;
  border-radius: 8px;
  border: transparent;
  margin: 34px auto;
  padding: 3px 3px;
  box-shadow: 10px 10px 50px 1px #636e72
`;

const StyledDiv5 = styled.div`
  max-width: 633px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
`;

const StyledP1 = styled.p`
  text-align: center;
  min-width: 300px;
`;

const StyledInput1 = styled.input`
  min-width: 200px;
  height: 30px;
  margin: 0 10px;
`;

const StyledInput2 = styled.input`
  min-width: 240px;
  height: 30px;
  margin: 0 10px;
`;

const StyledImg = styled.img`
  display: inline-block;
  vertical-align: middle;
  margin: 0px 10px;
  width: 30px;
`;

const StyledButton1 = styled.button`
  display: inline-block;
  background-color: transparent;
  border: transparent;
  outline: 0;
`;

const StyledButton2 = styled.button`
  display: block;
  text-align: center;
  background-color: transparent;
  border: transparent;
  outline: 0;
`;