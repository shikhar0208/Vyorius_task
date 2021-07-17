import React, { useState, Fragment } from 'react';
import SubmitLoader from './utils/SubmitLoader';

import '../styles/NewTodoForm.css';

const initialDetails = { description: '', completed: false };

const NewTodoForm = (props) => {
  const [details, setDetails] = useState(initialDetails);
  const [showLabel, setShowLabel] = useState(false);
  const handleChange = (e) => {
    setDetails({ ...details, description: e.target.value });
    setShowLabel(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.description !== '') {
      props.addTodo(details);
      setDetails(initialDetails);
      setShowLabel(false);
    } else {
      setShowLabel(true);
    }
  };
  return (
    <Fragment>
      {props.loading ? (
        <SubmitLoader />
      ) : (
        <form className='NewTodoForm' onSubmit={handleSubmit}>
          {showLabel && <label htmlFor='task'>Please enter task</label>}
          <input
            type='text'
            value={details.description}
            placeholder='New Task'
            onChange={handleChange}
          />
          <button>ADD Task</button>
        </form>
      )}
    </Fragment>
  );
};

export default NewTodoForm;
