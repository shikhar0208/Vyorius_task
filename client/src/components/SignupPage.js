import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/actions/userActions';

import LoginLoader from './utils/LoginLoader';
import '../styles/SigninPage.css';

const intialDetails = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const SignupPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(intialDetails);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, firstName } = details;

    if (email !== '' && password !== '' && firstName !== '') {
      setLoading(true);
      dispatch(signup(details, history)).then(() => setLoading(false));
    } else {
      alert('Please Fill all details');
    }
  };

  const handleChange = (e) => {
    const { name } = e.target;
    setDetails({ ...details, [name]: e.target.value });
  };

  const handleSwitch = () => {
    history.push('/');
  };

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className='firstName'>
            <label htmlFor='firstName'>First Name*</label>
            <input
              placeholder='First Name'
              type='text'
              name='firstName'
              value={details.firstName}
              noValidate
              onChange={handleChange}
            />
          </div>
          <div className='lastName'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              placeholder='Last Name'
              type='text'
              name='lastName'
              value={details.lastName}
              noValidate
              onChange={handleChange}
            />
          </div>
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
            {loading ? (
              <LoginLoader />
            ) : (
              <button type='submit'>Create Account</button>
            )}
            <small>
              Already Have an Account?{' '}
              <span className='switch-form' onClick={handleSwitch}>
                Sign in
              </span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
