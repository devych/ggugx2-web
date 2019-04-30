/* eslint-disable func-style */
import React, { Component } from 'react';
import axios from '../../../modules/impAxiosDefault';
import serverUrl from '../../../../src/serverInfo';
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
    console.log('TCL: LoginBox -> constructor -> props', props);
  }
  userLogin() {
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('storeId');
      sessionStorage.removeItem('storeName');
    }
    axios
      .post(
        `${serverUrl}/stores/signin`,
        // 'http://localhost:3000/users/signin',
        {
          phone: this.state.phone,
          password: this.state.password
        }
      )
      .then(res => {
        console.log(res);
        const { token, storeid, storename } = res.data;
        sessionStorage.setItem('storeId', storeid);
        sessionStorage.setItem('storeName', storename);
        sessionStorage.setItem('token', token);

        alert('로그인 되었습니다.');

        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${sessionStorage.getItem('token')}`;
        this.props.checkLogin();
        this.props.history.push('/StampsRewards');
      })
      .catch(err => {
        console.log(err);
        alert('ID 또는 비밀번호를 다시 확인해주세요.');
      });
  }

  render() {
    return (
      <span className="loginBox">
        <span className="bigTitle">
          <h3>매장 관리자 로그인</h3>
        </span>
        <span className="loginInfo">
          <ul className="loginInfo">
            <Input
              placeholder="02-123-1234"
              onChange={e => {
                this.setState({
                  phone: e.target.value
                });
              }}
            />
          </ul>
          <span className="loginInfo">
            <Input
              placeholder="비밀번호"
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
          <Button onClick={() => this.userLogin()}> 로그인 </Button>
          <Button onClick={() => this.props.history.push('/Signup')}>
            가입
          </Button>
        </span>
      </span>
    );
  }
}

export default LoginBox;
