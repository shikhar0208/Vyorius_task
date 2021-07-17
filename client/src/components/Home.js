import React from 'react';
import { useDispatch } from 'react-redux';
import { signout } from '../redux/actions/userActions';
import TodoList from './TodoList';
import '../styles/Home.css';

const Home = () => {
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signout());
  };

  return (
    <div className='container'>
      <div className='brandNameDiv'>
        <div>
          <h1 className='brandNameH1'>VYORIUS</h1>
        </div>
        <div>
          <button onClick={handleSignout}> Sign out</button>
        </div>
      </div>
      <TodoList />
    </div>
  );
};

export default Home;
