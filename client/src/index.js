import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import App, { history } from './App';
import store from './redux/store';
import './index.css';

import LoadingPage from './components/utils/LoadingPage';

import { setData, signout } from './redux/actions/userActions';

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

let hasRender = false;

const findUser = () => {
  if (Cookies.get('user-jwt')) {
    const decoded = jwt_decode(Cookies.get('user-jwt'));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(signout(history)).then(() => renderApp());
    } else {
      store.dispatch(setData(history)).then(() => renderApp());
    }
  }

  renderApp();
};

const renderApp = () => {
  if (!hasRender) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRender = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

findUser();
