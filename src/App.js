import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import PublicRoute from './layouts/public/PublicRoutes';
import PrivateRoute from './layouts/secured/SecureRoutes';
import { Provider } from 'react-redux';
import { store, history } from "./shared/store/store";


import LoginPage from './pages/login';
import RegisterPage from './pages/register';

import UsersPage from './pages/users';
import AddEditUser from './pages/user-add-edit';

import CalculatorPage from './pages/calculator';


import './index.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <PublicRoute path='/login' component={LoginPage}></PublicRoute>
          <PublicRoute path='/register' component={RegisterPage}></PublicRoute>
          <PrivateRoute path='/users-list' component={UsersPage}></PrivateRoute>
          <PrivateRoute path='/add-user' component={AddEditUser}></PrivateRoute>
          <PrivateRoute path='/users/:id' component={AddEditUser}></PrivateRoute>
          <PrivateRoute path='/calci' component={CalculatorPage}></PrivateRoute>
        </Switch>
      </Router>
    </Provider>)
}

export default App;
