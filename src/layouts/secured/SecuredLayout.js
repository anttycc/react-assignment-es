import React, { Fragment } from 'react';
import Header from '../../core/header/header';
import SideNav from '../../core/sidebar/sidebar';

// import logoImage from '../../assets/img/instarem_logo.svg';
import './SecuredLayout.css';

const SecuredLayout = ({ children, user, logout }) => {
  return (
    <Fragment>
      <Header logo={''} user={user} logout={logout} />
      <div className="app-content-wapper">
        <SideNav />
        <div className="app-content">
          {children}
        </div>
      </div>
    </Fragment> 
  );

}

export default SecuredLayout;
