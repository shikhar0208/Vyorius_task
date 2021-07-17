import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: 'https://vyorius-task.herokuapp.com/',
});
API.interceptors.request.use((req) => {
  if (Cookies.get('user-jwt')) {
    req.headers.authorization = `Bearer ${Cookies.get('user-jwt')}`;
  }
  return req;
});

export const signin = (formData) => API.post('/auth/signin', formData);

export const signup = (formData) => API.post('/auth/signup', formData);

export const getTasks = () => API.get('/task/');

export const addTask = (data) => API.post('/task/add', data);

export const updateTask = (formData) => API.patch('/task/edit', formData);

export const deleteTask = (formData) =>
  API.delete('/task/delete', { params: formData });
