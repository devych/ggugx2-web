/* eslint-disable func-style */
import { React, Component } from 'react';
import axios from 'axios';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';
import './index.css';

function userLogin() {
  let token;
  axios
    .post(
      // 'http://ec2-13-115-51-251.ap-northeast-1.compute.amazonaws.com:3000/users/signin',
      'http://localhost:3001/users/signin',
      {
        phone: '010-5555-0898',
        password: 'abcd'
      }
    )
    .then(res => {
      token = res.data.token;
      localStorage.setItem('token', token);
      alert('로그인 되었습니다.');
      console.log(token);
    })
    .then(() => {
      localStorage.getItem('token');
    })
    .catch(err => {
      alert('ID 또는 비밀번호를 다시 확인해주세요.');
      console.log(err);
    });
}

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
      password: null
    };
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
              placeholder="username"
              onChange={e => {
                console.log(e.target.value);
              }}
            />
          </ul>
          <span className="loginInfo">
            <Input
              placeholder="password"
              type="password"
              onChange={e => {
                console.log(e.target.value);
              }}
            />
          </span>
        </span>
        <span className="loginRegiButton">
          <Button onClick={() => userLogin()}> Login </Button>
          {console.log(this.props.history)}
          <Button onClick={() => this.props.history.push('/Signup')}>
            Register
          </Button>
        </span>
      </span>
    );
  }
}

export default LoginBox;
