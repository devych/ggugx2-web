import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

class Nav extends Component {
  state = { storeName: sessionStorage.getItem('storeName') };
  render() {
    return (
      <span>
        <span className="nav">
          <span className="item" id="storeName">
            {this.state.storeName} 정보
          </span>
          {/* <NavLink to="/MainPage" className="item">
        Main
      </NavLink> */}
          <NavLink to="/StampsRewards" className="item">
            적립관리
          </NavLink>
          {/* <NavLink to="/CustomerMng" className="item">
        고객관리
      </NavLink> */}
          <NavLink to="/ShopMng" className="item">
            매장관리
          </NavLink>
          {/* <NavLink to="/Statistic" className="item">
        통계
      </NavLink> */}
          {/* {sessionStorage.getItem('token') ? (
        <NavLink to="/Signin" className="item" style={{ display: 'none' }}>
          Signin
        </NavLink>
      ) : (
        <NavLink to="/Signin" className="item">
          Signin
        </NavLink>
      )} */}
        </span>
      </span>
    );
  }
}

export default Nav;
