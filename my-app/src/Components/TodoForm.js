import React, {useState, useEffect, useRef} from 'react'
import { TimePicker } from 'antd';
import moment, { duration } from 'moment';
import "./TodoForm.css"

function TodoForm(props) {
    const [input, setInput] = useState('')
    const [time, setTime] = useState(moment('00:00:00', 'HH:mm:ss'))
    const timeNow = moment()

    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            content: {
              text: input,
              deadline: time.format('LTS'),
              duration: time.diff(timeNow,"seconds")
            }
        })
        setInput('');
        setTime(moment('00:00:00', 'HH:mm:ss'));  
    };
    
    return (
        <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <div className="row">
            <TimePicker 
              defaultValue={moment('00:00:00', 'HH:mm:ss')} 
              className="time-picker"
              value={time}
              allowClear={false}
              onChange={setTime}/>

            <button onClick={handleSubmit} className='todo-button edit'>
              Update
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            placeholder='Add an action'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <div className="row">
            <TimePicker 
              defaultValue={moment('00:00:00', 'HH:mm:ss')} 
              value={time} 
              onChange={setTime}
              allowClear={false}
              className="time-picker"/>

            <button onClick={handleSubmit} className='todo-button'>
              Add habit
            </button>
          </div>
        </>
      )}
    </form>
    )
}

export default TodoForm
