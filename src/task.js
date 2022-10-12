import React, { useState } from 'react'
import './App.css'


function Task(props) {

    function callMove() {
        if (props.column == "todo") {
            props.moveTodoToIP(props.index)
        } else if (props.column == "in_progress") {
            props.moveIPtoTodo(props.index)
        }
    }

    return (
        <div className="task">
            <h1> {props.item.text} </h1>
            <button
                className="edit"
                onClick={() => { callMove() }}
            >
                ==X
            </button>

            <button
                className="edit"
                onClick={() => { props.setShowEdit(props.item.id) }}
            >
                EDIT ME
            </button>

            <button
                className='btn'
                onClick={() => { props.deleteTask(props.column, props.index) }}
            >
                X
            </button>

            {props.showEdit == props.item.id
                ?
                <div>
                    <input className="input"
                        onChange={(e) => props.setUpdatedText(e.target.value)}
                        value={props.updatedText}
                    />
                    <button
                        className="btn"
                        onClick={() => { props.editTask(props.index, props.column) }}
                    >
                        save
                    </button>
                </div>
                : <div></div>
            }
        </div>
    );
}

export default Task;