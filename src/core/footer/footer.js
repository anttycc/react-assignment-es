import React from 'react';
import Logo from '../logo';
import {Link} from "react-router-dom"
import './footer.css';

const Footer=({ logo })=> {
  return (
    <div className="app-footer">
      <Logo className="app-footer-logo" url={logo} />
      <div className="app-footer-nav-desc-wrapper">
        <span className="app-footer-description">
          <p>
            Lorem Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            sed diam nonummy nibh euismod tincidunt ut
            laoreet dolore magna aliquam erat volutpat.
          </p>
        </span>
       <div className="footer-nav">
      <Link to="/aboutus">ABOUT US</Link>
      <Link to="/press">PRESS</Link>
      <Link to="/contactus">CONTACT US</Link>
      <Link to="/careers">CAREERS</Link>
    </div>
      </div>
      <div className="divider" />
      <div className="app-footer-nav-desc-wrapper">
        <span className="app-footer-description">
          <p>© keshav</p>
        </span>
        {/* <SocialMedia /> */}
      </div>
    </div>
  );
}

export default Footer;
