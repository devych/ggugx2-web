import React from 'react';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';

const LoginBox = () => {
  return (
    <span>
      <ul>
        <h1>Admin Login</h1>
      </ul>
      <ul>
        <Input placeholder="username" />
      </ul>
      <ul>
        <Input placeholder="password" />
      </ul>

      <ul>
        <Button onClick={() => alert('Success Login!')}> Login </Button>
        <Button
          children="Register"
          onClick={() => alert('to the RegisterPage')}
        />
      </ul>
    </span>
  );
};

export default LoginBox;
