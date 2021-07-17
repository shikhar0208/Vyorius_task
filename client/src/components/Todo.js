import React, { useState } from 'react';
import '../styles/Todo.css';

const Todo = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    description: props.description,
    completed: props.completed,
  });

  const toggleForm = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name } = e.target;
    setDetails({ ...details, [name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    props.updateTodo(props.id, details);
    setIsEditing(false);
  };

  const handleToggle = (e) => {
    const data = {
      description: details.description,
      completed: !details.completed,
    };
    props.updateTodo(props.id, data);
  };

  return (
    <div>
      {isEditing ? (
        <div className='Todo'>
          <form className='Todo-edit-form' onSubmit={handleUpdate}>
            <input
              type='text'
              name='description'
              value={details.description}
              onChange={handleChange}
            />
            <button>Save</button>
          </form>
        </div>
      ) : (
        <div className='Todo'>
          <li
            onClick={handleToggle}
            className={props.completed ? 'Todo-task completed' : 'Todo-task'}
          >
            {props.description}
          </li>
          <div className='Todo-buttons'>
            <button onClick={toggleForm}>
              <i className='fas fa-pen' />
            </button>
            <button
              className='Todo-buttons'
              onClick={(e) => {
                props.handleRemove(props.id);
              }}
            >
              <i className='fas fa-trash' />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
