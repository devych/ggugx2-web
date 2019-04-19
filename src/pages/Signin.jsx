import React from 'react';
import LoginBox from '../components/molecules/loginBox';

const Signin = ({ history }) => {
  return (
    <div>
      <LoginBox history={{ history }} />
    </div>
  );
};

export default Signin;
