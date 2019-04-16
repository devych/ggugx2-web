import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './index.css';

const Nav = () => {
  return (
    <span className="nav">
      <NavLink to="/" className="item">
        home
      </NavLink>
      <NavLink to="/MainPage" className="item">
        main
      </NavLink>
      <NavLink to="/Caffeinfo" className="item">
        Cafeinfo
      </NavLink>
      <Link to="/Caffemenu" className="item">
        Cafemenu
      </Link>
    </span>
  );
};

export default Nav;
