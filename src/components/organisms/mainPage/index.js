import React, { Component } from 'react';
import axios from 'axios';
import PhoneSearchList from '../../molecules/phoneSearchList';
import ContentsList from '../contentsList';
import './index.css';

class mainPage extends Component {
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
      var list =
        this.state.data &&
        this.state.data.filter(
          item => item.phone.slice(-4) === String(this.state.phone)
        );
      this.setState({ correctPhoneList: list });
    });
  }

  render() {
    return (
      <div className="MainPage">
        <h1>MainPage</h1>
        <PhoneSearchList
          phoneList={this.state.correctPhoneList}
          className="PhoneSearchList"
          onChange={e => this.onHandleChange(e)}
        />
        <ContentsList />
      </div>
    );
  }
}

export default mainPage;
