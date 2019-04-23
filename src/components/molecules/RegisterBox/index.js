import React, { Component } from 'react';
import axios from 'axios';
import RegisterLabel from '../RegisterLabel/index';
import Button from '../../atoms/button/index';
import './index.css';
import Weekday from '../weekday';

class RegisterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cafeTitle: null,
      phone: null,
      password: null,
      address: null,
      openHour: null,
      closeHour: null,
      stamp: null,
      dayOff: null
    };
  }

  userRegister() {
    axios
      .post(
        'http://ec2-13-115-51-251.ap-northeast-1.compute.amazonaws.com:3000/stores/signup',
        // `http://localhost:3000/users/signup`,
        {
          phone: this.state.phone,
          storename: this.state.cafeTitle,
          password: this.state.password,
          address: this.state.address,
          openhour: this.state.openHour,
          closehour: this.state.closeHour,
          stamp: this.state.stamp,
          dayoff: this.state.dayOff
        }
      )
      .then(res => {
        console.log(res);
        alert('회원가입이 완료되었습니다.');
        this.props.props.push('/MainPage');
      })
      .catch(err => {
        console.log(err.response);
        alert('정보를 정확히 입력해주세요.');
      });
  }

  setCafeTitleInputToState(e) {
    this.setState({ cafeTitle: e.target.value });
  }
  setPhoneInputToState(e) {
    this.setState({ phone: e.target.value });
  }
  setPasswordInputToState(e) {
    this.setState({ password: e.target.value });
  }
  setAddressInputToState(e) {
    this.setState({ address: e.target.value });
  }
  setOpenHourInputToState(e) {
    this.setState({ openHour: e.target.value });
  }
  setCloseHourInputToState(e) {
    this.setState({ closeHour: e.target.value });
  }
  setStampInputToState(e) {
    this.setState({ stamp: e.target.value });
  }
  setDayOffInputToState(e) {
    this.setState({ dayOff: e.target.value });
  }

  render() {
    return (
      <table className="registerBox">
        <caption className="bigTitle">
          <h2>회원가입</h2>
        </caption>
        <span className="registerLabelList">
          <RegisterLabel
            label="CafeTitle"
            className="CafeTitle"
            onChange={e => this.setCafeTitleInputToState(e)}
          />
          <RegisterLabel
            label="Phone"
            className="Phone"
            onChange={e => this.setPhoneInputToState(e)}
          />
          <RegisterLabel
            label="Password"
            className="Password"
            type="password"
            onChange={e => this.setPasswordInputToState(e)}
          />
          <RegisterLabel
            label="Address"
            className="Address"
            onChange={e => this.setAddressInputToState(e)}
          />
          <RegisterLabel
            label="OpenHour"
            className="OpenHour"
            type="time"
            onChange={e => this.setOpenHourInputToState(e)}
          />
          <RegisterLabel
            label="CloseHour"
            className="CloseHour"
            type="time"
            onChange={e => this.setCloseHourInputToState(e)}
          />
          <RegisterLabel
            label="Stamp"
            className="Stamp"
            onChange={e => this.setStampInputToState(e)}
          />
          <RegisterLabel
            label="DayOff"
            className="DayOff"
            type="date"
            onChange={e => this.setDayOffInputToState(e)}
          />

          <Weekday mon={'월'} children={'월'} />
          {/*//TODO:이부분 다시 싹다 정리해야함 <span className="registerButton"> */}
          <Button
            className="registerButton"
            onClick={() => this.userRegister()}
          >
            Submit
          </Button>
        </span>
      </table>
    );
  }
}
export default RegisterBox;
