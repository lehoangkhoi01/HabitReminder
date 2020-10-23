import React, {useState} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import Notification from './Notification'
import "./TodoList.css"
import { notification } from 'antd';

function TodoList() {
    const [todos, setTodos] = useState([])
    const [timeoutManager, setTimeoutManager] = useState({})

    const addTodo = (todo) => {
        if(!todo.content.text || /^\s*$/.test(todo.content.text)) {  // validate input 
            return;
        }
        if (!todo.content.deadline || /^\s*$/.test(todo.content.deadline)) {
            return;
        }

        const newTodos = [todo, ...todos]
        setTodos(newTodos)
        
        const timeout = setAlertTodo(todo, onAlert);
        setTimeoutManager((manager) => {
            if (todo) {
                let newManager = {...manager};
                newManager[todo.id] = timeout;
                return newManager;
            }
        });
    }
    
    const onAlert = (id) => {
        if (!todos[id]){
            return;
        }
        const timeout = setAlertTodo(todos[id], onAlert);
        setTimeoutManager((manager) => {
            manager[id] = timeout;
        });
    }
    const setAlertTodo = (todo, cb) => {
        let manager = setTimeout(() => {
            openNotification("bottomRight", todo);
            cb(todo.id);
        }, todo.content.duration >= 0 ? todo.content.duration * 1000 - 1800000 : todo.content.duration*1000 + 84600000);
        console.log(manager)
        return manager;
    }

    const updateTodo = (todoId, newValue) => {
        if(!newValue.content.text || /^\s*$/.test(newValue.content.text)) {
            return;
        }
        setTodos(prev => prev.map(item => (item.id) === todoId ? newValue : item))
        clearTimeout(timeoutManager[todoId])

        const timeout = setAlertTodo(newValue, onAlert); // update new timeout
        setTimeoutManager((manager) => {
            if (newValue) {
                let newManager = {...manager};
                newManager[newValue.id] = timeout;
                return newManager;
            }
        })
    }

    const removeTodo = todo => {
        const removeArr=[...todos].filter(el=>el.id !== todo.id)
        setTodos(removeArr)
        clearTimeout(timeoutManager[todo.id])
    }

    // const completeTodo = id => {
    //     let updatedTodos = todos.map(todo => {
    //         if (todo.id === id) {
    //             todo.isComplete = !todo.isComplete
    //         }
    //         return todo
    //     })
    //     setTodos(updatedTodos)
    // }

    // const isDeadline = todo => {
    //     if (todo.content.duration <= 30) {
    //         return true;
    //     }
    //     return false;
    // }

    const openNotification = (placement, todo) => {
        notification.info({
          message: `Notification ${todo.content.text}`,
          description:
            'You have deadline',
          placement,
        });
    }
    return (
        <div>
            <div className="form-heading">
                <h1>Plan for today</h1>
            </div>
            <TodoForm onSubmit={addTodo}/>
            <Todo todo={todos} removeTodo={removeTodo} updateTodo ={updateTodo}/>
            {/* <Notification notify={isDeadline} todo={todos}/> */}
        </div>
    )
}

export default TodoList
