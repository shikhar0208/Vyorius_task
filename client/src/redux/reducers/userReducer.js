import {
  USER_LOGIN,
  USER_SIGNUP,
  USER_LOGOUT,
  SET_DATA,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from '../actionsType';
import Cookies from 'js-cookie';

const initialState = {
  userData: null,
  isAuthenticated: false,
  tasks: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      Cookies.set('user-jwt', action?.payload?.token, { expires: 7 });
      return {
        ...state,
        userData: action?.payload?.userDetails,
        tasks: action?.payload?.tasks,
        isAuthenticated: true,
      };

    case USER_SIGNUP:
      Cookies.set('user-jwt', action?.payload?.token, { expires: 7 });
      return {
        ...state,
        userData: action?.payload?.userDetails,
        isAuthenticated: true,
      };

    case USER_LOGOUT:
      Cookies.remove('user-jwt');
      return initialState;

    case SET_DATA:
      return {
        ...state,
        isAuthenticated: true,
        userData: action?.payload?.user,
        tasks: [...action?.payload?.tasks],
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: action?.payload,
      };

    case UPDATE_TASK:
      const updatedTasks = state.tasks.map((task) => {
        if (task._id === action?.payload?._id) {
          return { ...task, ...action?.payload };
        } else {
          return task;
        }
      });
      return {
        ...state,
        tasks: updatedTasks,
      };

    case DELETE_TASK:
      const remainingTasks = state.tasks.filter((task) => {
        return task._id !== action?.payload;
      });
      return {
        ...state,
        tasks: remainingTasks,
      };
    default:
      return state;
  }
};

export default userReducer;
