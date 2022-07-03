import React, { useState } from 'react'
import './App.css'

function App() {

  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState();
  const [updatedText, setUpdatedText] = useState('');

  function addItem() {

    if (!newItem) {alert('Press enter an item.');
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 2137),
      value: newItem,
    };

    setItems((prevList) => [...prevList, item]);
    setNewItem('');
  }


  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray); }

  function editItem(id, newText) {

    const currentItem = items.filter((item) => item.id === id);

    if(!updatedText){
      alert('Press enter an item.');
      return;
    }

    const updatedItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);

    setItems((prevList) => [...prevList, updatedItem]);
    setUpdatedText('');
    setShowEdit(0);
  }

  function sth(){
    setShowEdit(0);

  }
  function taskLeft(){
    if(items.length > 1){
      return(<p>{items.length} Tasks left</p>)
    }else{
      return(<p>{items.length} Task left</p>)
    }
  }

  return (
    <div className='app'>

      <h1>Todo List</h1>
      {taskLeft()}

      <input className='input'
        type='text'
        placeholder='Add an item'
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />

      <button className='button' onClick={() => addItem()}>Add</button>

      <ul>
        {items.map((item) => {
          return (
            <div>
              <li className='div' key={item.id} >
                {item.value}
                <button
                  className='delete-button'
                  onClick={() => deleteItem(item.id)}
                >
                  ❌
                </button>
                <button onClick={() => setShowEdit(item.id)} className='edit'>✎</button>
              </li>

              {showEdit == item.id ? (
                <div>
                  <input className='input'
                    type='text'
                    placeholder='Update item'
                    value = {updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <button className='button' onClick={() => editItem(item.id, updatedText)}>
                    Update
                  </button>
                  <button onClick={sth} className='delete-button'>❌</button>
                </div>
              ) : null }
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
