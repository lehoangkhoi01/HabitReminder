import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';


function App() {
  return (
    <div className="reminder-app">
      <TodoList/>
    </div>
  );
}

export default App;
