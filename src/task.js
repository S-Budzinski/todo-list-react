import React, { useState } from 'react'
import './App.css'


function Task(props) {

    function callMove() {
        if (props.column == "todo") {
            props.moveTodoToIP(props.index)
        } else if (props.column == "in_progress") {
            props.moveIPtoCompl(props.index)
        } else if (props.column == "completed") {
            props.moveCompltoIP(props.index)
        }
    }
    let button;
    if (props.column == "todo"){
        button = "➡"
    }else if (props.column == "in_progress"){
        button = "➡"
    }else if (props.column == "completed") {
        button = "⬅"
    }
    return (
        <div className="btn">
            <h1> {props.item.text} </h1>
            {props.column == "in_progress" ? <button className="edit" onClick={() => {props.moveIPtoTodo(props.index)}}>⬅</button>: null}
            <button
                className="edit"
                onClick={() => { callMove() }}
            >
                {button}
            </button>
            
            <button
                className="edit"
                onClick={() => { props.setShowEdit(props.item.id) }}
            >
                🖊
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