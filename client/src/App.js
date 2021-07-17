import React from 'react';

import { BrowserRouter, Switch } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';

import PrivateRoute from './routers/PrivateRoute';
import PublicRoute from './routers/PublicRoute';

import SigninPage from './components/SigninPage';
import SignupPage from './components/SignupPage';
import Home from './components/Home';

export const history = createHistory();
const App = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <PublicRoute path='/' exact component={SigninPage} />
        <PublicRoute path='/signup' exact component={SignupPage} />
        <PrivateRoute path='/home' exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
