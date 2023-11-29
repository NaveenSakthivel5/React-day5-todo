import React, { useState } from 'react';
import './App.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingTodoId, setEditingTodoId] = useState(null);

  const addTodo = () => {
    if (!taskName.trim()) return;

    const newTodo = {
      id: new Date().getTime(),
      taskName,
      description,
      status: 'not-completed',
    };

    setTodos([...todos, newTodo]);
    setTaskName('');
    setDescription('');
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    setEditingTodoId(null);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.status = newStatus;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const toggleStatus = (id) => {
    const todo = todos.find(todo => todo.id === id);
    const newStatus = todo.status === 'completed' ? 'not-completed' : 'completed';
    updateStatus(id, newStatus);
  };

  const startEditing = (id) => {
    setEditingTodoId(id);
    const todoToEdit = todos.find(todo => todo.id === id);
    setTaskName(todoToEdit.taskName);
    setDescription(todoToEdit.description);
  };

  const finishEditing = () => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === editingTodoId) {
        todo.taskName = taskName;
        todo.description = description;
      }
      return todo;
    });

    setTodos(updatedTodos);
    setEditingTodoId(null);
    setTaskName('');
    setDescription('');
  };

  const cancelEditing = () => {
    setEditingTodoId(null);
    setTaskName('');
    setDescription('');
  };

  const displayFilteredTodos = () => {
    if (filterStatus === 'all') {
      return todos;
    } else {
      return todos.filter(todo => todo.status === filterStatus);
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      <div>
        <div>
          <div >
            <label htmlFor="taskName"></label>
            <input
              type="text"
              placeholder='Name'
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div >
            <label htmlFor="description"></label>
            <textarea
              type="text"
              id="description"
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        
        
        {editingTodoId === null ? (
          <button onClick={addTodo}>Add Todo</button>
        ) : (
          <>
            <button onClick={finishEditing}>Save Changes</button>
            <button onClick={cancelEditing}>Cancel</button>
          </>
        )}
      </div>

      <div className="filter-buttons">
        <label>Filter Status:</label>
        <select className="select-filter" onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not-completed">Not Completed</option>
        </select>
      </div>
          <br />
          
      <div className='midheading'>
        <h1><b>My Todos:</b></h1>
      </div>
      <div>
        {displayFilteredTodos().map(todo => (
          <div key={todo.id} className="todo-card">
            <p>Name: {todo.taskName}</p>
            <p>Description: {todo.description}</p>
            <label>Status: </label>
            <select
              className={`status-dropdown ${todo.status}`}
              value={todo.status}
              onChange={(e) => updateStatus(todo.id, e.target.value)}
            >
              <option value="not-completed">Not Completed</option>
              <option value="completed">Completed</option>
            </select>
            
            <div>
              <br/>
              <button className='editbutton' onClick={() => startEditing(todo.id)}>Edit</button>
              <button className='deletebutton' onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
