import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin } from '../redux/actions/userActions';

import LoginLoader from './utils/LoginLoader';
import '../styles/SigninPage.css';

const intialDetails = {
  email: '',
  password: '',
};

const SigninPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(intialDetails);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.email !== '' && details.password !== '') {
      setLoading(true);
      dispatch(signin(details, history)).then(() => setLoading(false));
    } else {
      alert('Please enter email and password');
    }
  };

  const handleChange = (e) => {
    const { name } = e.target;
    setDetails({ ...details, [name]: e.target.value });
  };

  const handleSwitch = () => {
    history.push('/signup');
  };

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className='email'>
            <label htmlFor='email'>Email*</label>
            <input
              placeholder='Email'
              type='email'
              name='email'
              value={details.email}
              noValidate
              onChange={handleChange}
            />
          </div>
          <div className='password'>
            <label htmlFor='password'>Password*</label>
            <input
              placeholder='Password'
              type='password'
              name='password'
              value={details.password}
              noValidate
              onChange={handleChange}
            />
          </div>
          <div className='createAccount'>
            {loading ? <LoginLoader /> : <button type='submit'>Sign in</button>}
            <small>
              Don't have an account?{' '}
              <span className='switch-form' onClick={handleSwitch}>
                Sign up
              </span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
