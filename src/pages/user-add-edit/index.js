import React, { Component } from "react";
import './index.css';
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import RenderField from "../../shared/components/input-field";
import { addUser, editUser, getUser } from "../../shared/store/actions/user.actions";
import { Link, withRouter } from "react-router-dom";
import { Card, CardBody, Col } from 'reactstrap';

const validate = values => {
  const errors = {};
  if (!values.first_name) {
    errors.name = "Required";
  }
  if (!values.last_name) {
    errors.year = "Required";
  }
  if (!values.email) {
    errors.pantone_value = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

class AddEditUserPage extends Component {
  constructor() {
    super();
    this.state = {
      isEdit: false,
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.setState({ isEdit: true, id }, () => {
        this.props.getUser(id)
      })
    }
  }
  handleSubmit = (values) => {
    if (this.state.isEdit) {
      this.props.editUser({ ...values, id: this.state.id });
    } else {
      values.id = Math.floor(Math.random() * (100 - 12) + 12);
      this.props.addUser(values);
    }

  }
  render() {

    const { handleSubmit, submitting } = this.props;
    return (
      <Col>
        <Card>
          <CardBody>

            <div className="useradd-edit-main-form">
              <form className="actual-form" onSubmit={handleSubmit(this.handleSubmit)} noValidate>
                <Field className="email-field"
                  name="first_name"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="off"
                  type="text"
                  component={RenderField}
                  label="Firstname"
                />

                <Field
                  name="last_name"
                  type="text"
                  component={RenderField}
                  label="Lastname"
                />

                <Field
                  name="email"
                  type="email"
                  component={RenderField}
                  label="Email"
                />
                <div className="user-edit-btn-wrapper">
                  <button className="btn btn-primary" type="submit" disabled={submitting}>
                    Save
            </button>
            &nbsp; &nbsp; &nbsp;<Link to={'/users-list'}>Back</Link>

                </div>
              </form>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default compose(
  connect(
    ({ user }) => ({
      initialValues: user.selectedUser // pull initial values from account reducer
    }),
    dispatch => ({
      addUser: values => dispatch(addUser(values)),
      editUser: values => dispatch(editUser(values)),
      getUser: id => dispatch(getUser(id))
    })
  ),
  withRouter,
  reduxForm({
    form: "user-form",
    validate
  })
)(AddEditUserPage);
