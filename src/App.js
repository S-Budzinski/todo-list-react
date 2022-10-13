import React, { useState } from 'react'
import './App.css'
import Task from './task.js'

function App() {
  const [items, setItems] = useState([])
  const [ipItems, setIpItems] = useState([])
  const [complItems, setComplItems] = useState([])

  // items, ipItems and complItems object is object with property "text"

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
    setItems((prevList) => [...prevList, ipItems[index]]);
    setIpItems(ipItems.filter(item => item.id !== ipItems[index].id))
  }
  // moves task from in progress to completed column
  function moveIPtoCompl(index) {
    setComplItems((prevList) => [...prevList, ipItems[index]]);
    setIpItems(ipItems.filter(item => item.id !== ipItems[index].id))
  }
  // moves task from completed to in progress column
  function moveCompltoIP(index) {
    setIpItems((prevList) => [...prevList, complItems[index]]);
    setComplItems(complItems.filter(item => item.id !== complItems[index].id))
  }

  function editTask(index, column) {
    let data;
    if (column == "todo")
      data = items
    else if (column == "in_progress")
      data = ipItems
    else if (column == "completed")
      data = complItems

    data[index].text = updatedText
    setUpdatedText("")
    setShowEdit()

    if (column == "todo")
      setItems(data)
    else if (column == "in_progress")
      setIpItems(data)
    else if (column == "completed")
      setComplItems(data)
  }

  function deleteTask(column, index) {
    if (column == "todo")
      setItems(items.filter(item => item.id !== items[index].id))
    else if (column == "in_progress")
      setIpItems(ipItems.filter(item => item.id !== ipItems[index].id))
    else if (column == "completed")
      setComplItems(complItems.filter(item => item.id !== complItems[index].id))
  }

  return (
    <div className='app'>
        <div>
          <input className="input"
            onChange={(e) => setNewItemText(e.target.value)}
            value={newItemText}
          />
          <button
            className="button"
            onClick={() => { addItem() }}
          >
            Add item
          </button>
        </div>
      <div className="container">
        {/* Remain column */}
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
        {/* In progress column */}
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
              moveIPtoCompl={moveIPtoCompl}
              setShowEdit={setShowEdit}
              setUpdatedText={setUpdatedText}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          )))}
        </div>
      {/* Completed column */}
        <div className="remain">
          {complItems.map(((item, index) => (
            <Task
              key={item.id}
              item={item}
              index={index}
              column="completed"
              updatedText={updatedText}
              showEdit={showEdit}
              moveCompltoIP={moveCompltoIP}
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
