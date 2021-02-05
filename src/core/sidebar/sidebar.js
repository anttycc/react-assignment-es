import React from 'react';
import { NavLink } from 'react-router-dom';
import SideNavItems from '../../app-constants/SideNavItems';
import './sidebar.css';

const SideNavItem=({ items })=> {
  return (items.map((item, index) => (
    <li key={index}>
      <NavLink   activeClassName='active' to={item.path}>
        {/* <img className="app-sidenav-item-icon" src={item.icon} alt="logo" /> */}
        {item.icon}
        <label>{item.name}</label>
      </NavLink >
    </li>
  )));
}

const SideNav=()=> {
  return (
    <div className="app-sidenav-wrapper">
      <ul className="list-wrapper">
        <SideNavItem items={SideNavItems} />
      </ul>
    </div>
  );
}

export default SideNav;
