import React from 'react';
import { Link } from 'react-router-dom';
import './index.style.css';

const Logo=(props)=> {
  return (
    <Link to="/">
      {/* <img alt="logo" className="logo-img" src={props.url} {...props} /> */}
      LOGO
    </Link>
  );
}

export default Logo;
