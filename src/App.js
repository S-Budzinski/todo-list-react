//To do list
import React, { useState } from 'react'
import './App.css'

function App() {
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState([])

  const [showEdit, setShowEdit] = useState()
  const [updatedText, setUpdatedText] = useState('')

  const [ipItems, setIpItems] = useState([])

  function addItem() {
    if (!newItem) {
      alert('Press enter an item.')
      return
    }
    const item = {
      id: [items.length],
      value: newItem
    }

    setItems((prevList) => [...prevList, item])
    setNewItem('')
  }

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id)
    setItems(newArray)
  }
  function deleteIpItem(id) {
    const newArray = ipItems.filter((item) => item.id !== id)
    setIpItems(newArray)
  }
  function editItem(id, newText) {
    const currentItem = items.filter((item) => item.id === id)

    if (!updatedText) {
      alert('Press enter an item.')
      return
    }

    const updatedItem = {
      id: currentItem.id,
      value: newText
    }

    deleteItem(id)

    setItems((prevList) => [...prevList, updatedItem])
    setUpdatedText('')
    setShowEdit(0)
  }
  function sth() {
    setShowEdit(0)
  }
  function taskLeft() {
    if (items.length > 1) {
      return (<p>{items.length} Tasks left</p>)
    } else {
      return (<p>{items.length} Task left</p>)
    }
  }
  function switchTask(id, value) {
    const IpItem = {
      id: [ipItems.length],
      value: value
    }
    deleteItem(id)
    setIpItems((prevList) => [...prevList, IpItem])
  }
  function switchIpTask(id, value) {
    const item = {
      id: [items.length],
      value: value
    }
    deleteIpItem(id)
    setItems((prevList) => [...prevList, item])
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
      <br />
      <div className='container'>
        <div className='remain'>
          <h2>Remain</h2>
          {items.map((item) => {
            return (
              <div key={item.id} className='task'>
                <li>
                  {item.value}
                  <button
                    className='delete-button'
                    onClick={() => deleteItem(item.id)}
                  >
                    ❌
                  </button>
                  <button onClick={() => setShowEdit(item.id)} className='edit'>✎</button>
                </li>
                <button className='btn' onClick={() => switchTask(item.id, item.value)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" /><path d="M11.293 8.707 13.586 11H8v2h5.586l-2.293 2.293 1.414 1.414L17.414 12l-4.707-4.707-1.414 1.414z" /></svg></button>
              </div>
            )
          })}</div>
        <div className='main-show'>
          {items.map((item) => {
            return (
              <div key={item.id} >
                {showEdit === item.id
                  ? (
                    <div className='show'>
                      <input className='input'
                        type='text'
                        placeholder='Update item'
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                      />
                      <button className='button' onClick={() => editItem(item.id, updatedText)}>
                        Update
                      </button>
                      <button onClick={sth} className='delete-button1'>❌</button>
                      <br />
                    </div>
                  )
                  : null}
              </div>
            )
          })}</div>
        <div className='inprogress'>
          <h2>Completed</h2>
          {ipItems.map((item) => {
            return (
              <div key={item.id} className='task'>
                <li>
                  {item.value}
                  <button
                    className='delete-button'
                    onClick={() => deleteIpItem(item.id)}
                  >
                    ❌
                  </button>
                </li>
                <button className='btn' onClick={() => switchIpTask(item.id, item.value)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" /><path d="m12.707 8.707-1.414-1.414L6.586 12l4.707 4.707 1.414-1.414L10.414 13H16v-2h-5.586l2.293-2.293z" /></svg></button>
              </div>
            )
          })}</div>
      </div>
    </div>
  )
}

export default App
