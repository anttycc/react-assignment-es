import React, { Fragment } from "react";
import './login.css';
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect, Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { doLogin } from "../../shared/store/actions/login.actions";
import RenderField from "../../shared/components/input-field";

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = "Required";
  } else if (!/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/.test(values.password)) {
    errors.password = 'Must contain one capital and small character,one spacial symbol';
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};
const LoginPage = props => {
  const { handleSubmit, isAuthenticated, submitting } = props;
  return (
    <Fragment>
      {isAuthenticated ? (
        <Redirect to="/users" />
      ) : (
          <div className="login-main-form">
            <h3> Login</h3>

            <form className="actual-form" onSubmit={handleSubmit} noValidate>
              <Field className="email-field"
                name="email"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="off"
                type="email"
                component={RenderField}
                label="Email"
              />

              <Field
                name="password"
                type="password"
                component={RenderField}
                label="Password"
              />
              <div className="login-btn-wrapper">
                <button className="login-btn my-btn" type="submit" disabled={submitting}>
                  LogIn
            </button>  &nbsp; &nbsp; &nbsp;
            <Link to={'/register'}>Sign Up</Link>
              </div>
            </form>
          </div>
        )}
    </Fragment>
  );
};

export default compose(
  connect(
    ({
      login: {
        auth: { isAuthenticated, error }
      }
    }) => {
      return { isAuthenticated, authError: error };
    },
    dispatch => ({
      onSubmit: values => dispatch(doLogin(values))
    })
  ),
  withRouter,
  reduxForm({
    form: "login-form",
    validate
  })
)(LoginPage);
