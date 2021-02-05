import React, { Fragment } from "react";
import './index.css';
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import RenderField from "../../shared/components/input-field";
import { register } from "../../shared/store/actions/user.actions";
import { Link } from "react-router-dom";

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
const RegisterPage = props => {
  const { handleSubmit, submitting } = props;
  return (
    <Fragment>

      <div className="register-main-form">
        <h3> Signup</h3>
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
          <div className="register-btn-wrapper">
            <button className="register-btn my-btn" type="submit" disabled={submitting}>
              Register
            </button>
            &nbsp; &nbsp; &nbsp;<Link to={'/login'}>Login</Link>

          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default compose(
  connect(
    null,
    dispatch => ({
      onSubmit: values => dispatch(register(values))
    })
  ),
  reduxForm({
    form: "register-form",
    validate
  })
)(RegisterPage);
