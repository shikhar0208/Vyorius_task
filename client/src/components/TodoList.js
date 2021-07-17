import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NewTodoForm from './NewTodoForm';
import Todo from './Todo';

import { addNewTask, editTask, removeTask } from '../redux/actions/userActions';

import '../styles/TodoList.css';

const TodoList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const taskList = useSelector((store) => store.userReducer.tasks);

  const addTodo = (newTodo) => {
    setLoading(true);
    dispatch(addNewTask(newTodo)).then(() => setLoading(false));
  };

  const updateTodo = (id, updatedTask) => {
    dispatch(editTask(id, updatedTask));
  };

  const handleRemove = (id) => {
    dispatch(removeTask(id));
  };

  const todo = taskList.map((todo) => (
    <Todo
      key={todo._id}
      id={todo._id}
      description={todo.description}
      completed={todo.completed}
      updateTodo={updateTodo}
      handleRemove={handleRemove}
    />
  ));
  return (
    <div className='TodoList'>
      <h1>
        Todo List! <span>A Simple Todo List App.</span>
      </h1>
      <ul>{todo}</ul>
      <NewTodoForm addTodo={addTodo} loading={loading} />
    </div>
  );
};

export default TodoList;
