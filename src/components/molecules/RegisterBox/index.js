import React, { Component } from 'react';
import axios from 'axios';
import RegisterLabel from '../RegisterLabel/index';
import Button from '../../atoms/button/index';
import './index.css';

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
        'http://ec2-13-115-51-251.ap-northeast-1.compute.amazonaws.com:3000/users/signup',
        // `http://localhost:3000/users/signup`,
        {
          username: this.state.cafeTitle,
          password: this.state.password,
          phone: this.state.phone
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
      <span className="registerBox">
        <span className="bigTitle">
          <h2>회원가입</h2>
        </span>
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
            onChange={e => this.setOpenHourInputToState(e)}
          />
          <RegisterLabel
            label="CloseHour"
            className="CloseHour"
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
            onChange={e => this.setDayOffInputToState(e)}
          />
          {/* <span className="registerButton"> */}
          <Button
            className="registerButton"
            onClick={() => this.userRegister()}
          >
            Submit
          </Button>
          {/* </span> */}
        </span>
      </span>
    );
  }
}
export default RegisterBox;
