import React, {useState} from 'react'
import TodoForm from './TodoForm'
import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';
import "./Todo.css"


function Todo({todo, removeTodo, updateTodo}) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    if(edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate}/>
    }
 
    return (
        todo.map((todo,index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
            <div  key={todo.id}>
                {todo.content.text}
            </div>
            <div>
                Deadline: {todo.content.deadline}
            </div>
            <div className="icons">
                <RiCloseCircleLine onClick={() => removeTodo(todo)} className='delete-icons'/>
                <TiEdit onClick={() => setEdit({id: todo.id, value: todo.content})} className='edit-icons'/>
            </div>
        </div>
        ))
    )
}

export default Todo
