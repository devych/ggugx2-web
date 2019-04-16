import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const Nav = () => {
  return (
    <span className="nav">
      <NavLink to="/MainPage" className="item">
        Main
      </NavLink>
      <NavLink to="/CustomerMng" className="item">
        고객관리
      </NavLink>
      <NavLink to="/ShopMng" className="item">
        매장관리
      </NavLink>
      <NavLink to="/Statistic" className="item">
        통계
      </NavLink>
      {sessionStorage.getItem('token') ? null : (
        <NavLink to="/Signin" className="item">
          Signin
        </NavLink>
      )}
    </span>
  );
};

export default Nav;
