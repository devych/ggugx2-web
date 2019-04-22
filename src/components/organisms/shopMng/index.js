import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import SubNavBar from '../../molecules/subNavBar';
import PhoneSearchList from '../../molecules/phoneSearchList';
import Caffeinfo from '../../../pages/Caffeinfo';
import Caffemenu from '../../../pages/Caffemenu';

class shopMng extends Component {
  constructor(props) {
    super(props);

    axios
      .get('http://localhost:3333/customers')
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log(err.response);
      });

    this.state = {
      phone: null,
      data: null,
      correctPhoneList: null
    };
  }

  onHandleChange(e) {
    this.setState({ phone: e.target.value }, () => {
      var list = this.state.data.filter(
        item => item.phone.slice(-4) === String(this.state.phone)
      );
      this.setState({ correctPhoneList: list });
    });
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

        <PhoneSearchList
          phoneList={this.state.correctPhoneList}
          className="PhoneSearchList"
          onChange={e => this.onHandleChange(e)}
        />
      </div>
    );
  }
}

export default shopMng;
