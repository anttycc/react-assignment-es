import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SecuredLayout from './SecuredLayout'
import { connect } from 'react-redux';
import { doLogout } from '../../shared/store/actions/login.actions';

const PrivateRoute = ({ component: Component, doLogout, user, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated
      ? <SecuredLayout logout={doLogout} user={user}><Component {...props} /></SecuredLayout>
      : <Redirect to='/login' />
  )} />
)

export default connect(
  ({ login: { auth: { isAuthenticated, user } } }) => {
    return ({ isAuthenticated, user })
  }, { doLogout }
)(PrivateRoute);;
