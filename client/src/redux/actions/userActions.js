import * as api from './api';

import {
  USER_LOGIN,
  USER_SIGNUP,
  USER_LOGOUT,
  SET_DATA,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from '../actionsType';

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({
      type: USER_LOGIN,
      payload: {
        userDetails: data.result.userData,
        tasks: data.result.tasks,
        token: data.token,
      },
    });
    history.push('/home');
  } catch (err) {
    console.log(err);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({
      type: USER_SIGNUP,
      payload: { userDetails: data.result, token: data.token },
    });
    history.push('/home');
  } catch (err) {
    console.log(err);
  }
};

export const signout = (history) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGOUT,
    });
    history.push('/');
  } catch (err) {
    console.log(err);
  }
};

export const setData = (history) => async (dispatch) => {
  try {
    const { data } = await api.getTasks();
    dispatch({
      type: SET_DATA,
      payload: data.result,
    });

    if (history.location.pathname === '/') {
      history.push('/home');
    }
  } catch (err) {
    console.log(err);
  }
};

export const addTask = (taskData) => async (dispatch) => {
  try {
    await api.addTask(taskData);
    dispatch({
      type: ADD_TASK,
      payload: taskData,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addNewTask = (taskData) => async (dispatch) => {
  try {
    const { data } = await api.addTask(taskData);

    dispatch({
      type: ADD_TASK,
      payload: data.result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editTask = (id, changes) => async (dispatch) => {
  try {
    const formData = { _id: id, changes };
    const { data } = await api.updateTask(formData);
    console.log(data.result);
    dispatch({
      type: UPDATE_TASK,
      payload: data.result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeTask = (id) => async (dispatch) => {
  try {
    await api.deleteTask({ id: id });
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};
