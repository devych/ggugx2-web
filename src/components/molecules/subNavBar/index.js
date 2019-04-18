import React from 'react';
import { NavLink } from 'react-router-dom';

const SubNavBar = () => {
  return (
    <span className="subNav">
      <NavLink to="/ShopMng/Caffeinfo" className="subItem">
        정보수정
      </NavLink>
      <NavLink to="/ShopMng/Caffemenu" className="subItem">
        메뉴수정
      </NavLink>
      <NavLink to="/event" className="subItem">
        이벤트관리
      </NavLink>
    </span>
  );
};

export default SubNavBar;
