import React, { useState } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [ipItems, setIpItems] = useState([])
  // items and ipItems object is object with property "text"

  const [showEdit, setShowEdit] = useState() // if not editing then showEdit == null, and if editing then showEdit == integer representing id of task that is edited
  const [updatedText, setUpdatedText] = useState('')
  const [newItemText, setNewItemText] = useState('')

  function addItem() {
    if (!newItemText)
      return

    const task = {
      text: newItemText,
      id: Date.now()
    }

    setItems([...items, task]);
    setNewItemText("")
  }

  // moves task from todo column into in progress column
  function moveTodoToIP(index) {
    setIpItems((prevList) => [...prevList, items[index]]);
    setItems(items.filter(item => item.id !== items[index].id))
  }
  // the same but the other way around
  function moveIPtoTodo(index) {
    setItems([...items, ipItems[index]]);
    setIpItems(ipItems.filter(item => item.id !== ipItems[index].id))
  }

  return (
    <div className='app'>
      <div className="container">
        <div className="remain">
          {items.map(((item, index) => (
            <div key={item.id} className="task">
              <h1> {item.text} </h1>
              <button
                className="edit"
                onClick={() => { moveTodoToIP(index) }}
              >
                ==X
              </button>

              <button
                className="edit"
                onClick={() => { setShowEdit(item.id) }}
              >
                EDIT ME
              </button>

              {showEdit == item.id
                ?
                <div>
                  <input className="input"
                    onChange={(e) => setNewItemText(e.target.value)}
                    value={newItemText}
                  />
                </div>
                : <div></div>
              }
            </div>
          )))}
        </div>

        <div>
          <input className="input"
            onChange={(e) => setNewItemText(e.target.value)}
            value={newItemText}
          />
          <button
            className="button"
            onClick={() => { addItem() }}
          >
            add item uwu
          </button>
        </div>

        <div className="remain">
          {ipItems.map(((item, index) => (
            <div key={item.id} className="task">
              <h1> {item.text} </h1>
              <button
                onClick={() => moveIPtoTodo(index)}
                className="edit"
              >
                X==
              </button>
            </div>
          )))}
        </div>
      </div>
    </div >
  )
}

export default App
