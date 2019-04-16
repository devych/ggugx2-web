/* eslint-disable func-style */
import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';
import './index.css';

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
      password: null
    };
  }

  userLogin() {
    let token;
    axios
      .post(
        'http://ec2-13-115-51-251.ap-northeast-1.compute.amazonaws.com:3000/users/signin',
        // 'http://localhost:3001/users//signin',
        {
          phone: this.state.phone,
          password: this.state.password
        }
      )
      .then(res => {
        token = res.data.token;
        sessionStorage.setItem('token', token);
        alert('로그인 되었습니다.');
        this.props.props.history.push('/MainPage');
      })
      .catch(err => {
        console.log(err.response.data);
        alert('ID 또는 비밀번호를 다시 확인해주세요.');
      });
  }

  render() {
    return (
      <span className="loginBox">
        <span className="bigTitle">
          <h1>Admin Login</h1>
        </span>
        <span className="loginInfo">
          <ul className="loginInfo">
            <Input
              placeholder="phoneNumber"
              onChange={e => {
                this.setState({
                  phone: e.target.value
                });
              }}
            />
          </ul>
          <span className="loginInfo">
            <Input
              placeholder="password"
              type="password"
              onChange={e => {
                this.setState({
                  password: e.target.value
                });
              }}
            />
          </span>
        </span>
        <span className="loginRegiButton">
          <Button onClick={() => this.userLogin()}> Login </Button>
          <Button onClick={() => this.props.props.history.push('/Signup')}>
            Register
          </Button>
        </span>
      </span>
    );
  }
}

export default LoginBox;
