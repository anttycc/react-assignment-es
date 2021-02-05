import React from 'react';
import Logo from '../logo';
import './header.css';

const Header=({ logo, logout })=> {
  return (
    <div className="app-header">
      <Logo url={logo} />
      <button type="button" className="logout" onClick={logout}>
        Logout 
      </button>   

    </div>
  );
}

export default Header;
