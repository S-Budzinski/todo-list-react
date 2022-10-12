import React, { useState } from 'react'
import './App.css'
import Task from './task.js'

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

  function editTask(index, column) {
    let data;
    if (column == "todo")
      data = items
    else if (column == "in_progress")
      data = ipItems

    data[index].text = updatedText
    setUpdatedText("")
    setShowEdit()

    if (column == "todo")
      setItems(data)
    else if (column == "in_progress")
      setIpItems(data)
  }

  function deleteTask(column, index) {
    if (column == "todo")
      setItems(items.filter(item => item.id !== items[index].id))
    else if (column == "in_progress")
      setIpItems(ipItems.filter(item => item.id !== ipItems[index].id))
  }

  return (
    <div className='app'>
      <div className="container">
        <div className="remain">
          {items.map(((item, index) => (
            <Task
              key={item.id}
              item={item}
              index={index}
              column="todo"
              updatedText={updatedText}
              showEdit={showEdit}
              moveTodoToIP={moveTodoToIP}
              setShowEdit={setShowEdit}
              setUpdatedText={setUpdatedText}
              editTask={editTask}
              deleteTask={deleteTask}
            />
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
            <Task
              key={item.id}
              item={item}
              index={index}
              column="in_progress"
              updatedText={updatedText}
              showEdit={showEdit}
              moveIPtoTodo={moveIPtoTodo}
              setShowEdit={setShowEdit}
              setUpdatedText={setUpdatedText}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          )))}
        </div>
      </div>
    </div >
  )
}

export default App
