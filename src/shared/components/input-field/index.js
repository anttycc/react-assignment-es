import React from "react";
import './index.css';
const RenderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
    <div className="login-form-section">
      <div className="login-block">
        <div className="login-form-label-block">
          <label className="login-form-label">{label}</label>
          <div className="input-field-section">
            <input className="input-fields"  {...input} placeholder={label} type={type} />
            {touched &&
              ((error && <span className="error-message">{error}</span>) ||
                (warning && <span className="warning-message">{warning}</span>))}
          </div>
        </div>
      </div>
    </div>

  );

export default RenderField;