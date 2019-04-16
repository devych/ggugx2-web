import React from 'react';
import axios from 'axios';
import RegisterLabel from '../RegisterLabel/index';
import Button from '../../atoms/button/index';
import './index.css';

const userRegister = () => {
  axios
    .post(
      'http://ec2-13-115-51-251.ap-northeast-1.compute.amazonaws.com:3000/users/signup',
      // `http://localhost:3000/users/signup`,
      {
        username: 'ych',
        password: 'abcd',
        phone: '010-5555-1898'
      }
    )
    .then(res => {
      console.log(res);
      alert('회원가입이 완료되었습니다.');
    })
    .catch(err => {
      console.log(err);
      alert('정보를 정확히 입력해주세요.');
    });
};

const RegisterBox = () => {
  return (
    <span className="registerBox">
      <span className="bigTitle">
        <h3>회원가입</h3>
      </span>
      <span className="registerLabelList">
        <RegisterLabel label="Email" className="Email" />
        <RegisterLabel label="Password" className="Password" />
        <RegisterLabel label="Address" className="Address" />
        <RegisterLabel label="CafeTitle" className="CafeTitle" />
        <RegisterLabel label="MobileContact" className="MobileContact" />
        <RegisterLabel label="MainContact" className="MainContact" />
        {/* <span className="registerButton"> */}
        <Button className="registerButton" onClick={() => userRegister()}>
          Submit
        </Button>
        {/* </span> */}
      </span>
    </span>
  );
};

export default RegisterBox;
