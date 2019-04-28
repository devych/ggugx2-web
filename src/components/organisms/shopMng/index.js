import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SubNavBar from '../../molecules/subNavBar';
import PhoneSearchList from '../../molecules/phoneSearchList';
import Caffeinfo from '../../../pages/Caffeinfo';
import Caffemenu from '../../../pages/Caffemenu';
import './index.css';

class shopMng extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="shopMng">
        <Router>
          <SubNavBar match={'match'} className="subNav" />
          <Route exact path="/ShopMng" component={Caffeinfo} />
          <Route path="/ShopMng/Caffeinfo" component={Caffeinfo} />
          <Route path="/ShopMng/Caffemenu" component={Caffemenu} />
        </Router>
        <PhoneSearchList className="PhoneSearchList" />
      </div>
    );
  }
}

export default shopMng;
