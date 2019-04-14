import React from 'react';
import RegisterLabel from '../RegisterLabel/index';
import Button from '../../atoms/button/index';

const RegisterBox = () => {
  return (
    <div>
      <ul>
        <h3>회원가입</h3>
      </ul>
      <RegisterLabel label="Email" />
      <RegisterLabel label="Password" />
      <RegisterLabel label="Address" />
      <RegisterLabel label="CafeTitle" />
      <RegisterLabel label="MobileContact" />
      <RegisterLabel label="MainContact" />
      <Button children="Submit" onClick={() => alert('Success Registered!')} />
    </div>
  );
};

export default RegisterBox;
