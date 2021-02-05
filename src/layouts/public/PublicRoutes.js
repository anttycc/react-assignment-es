import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PublicLayout from './PublicLayout'
import { connect } from 'react-redux';

const PublicRoute = ({ component: Component, isAuthenticated, restricted, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isAuthenticated ?
        <Redirect to="/users-list" />
        : <PublicLayout><Component {...props} /></PublicLayout>
    )} />
  );
};

export default connect(
  ({ login: { auth: { isAuthenticated } } }) => {
    return ({ isAuthenticated })
  }
)(PublicRoute);