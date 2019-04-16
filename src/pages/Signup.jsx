import React from 'react';
import RegisterBox from '../components/molecules/RegisterBox';

const Signup = ({ history }) => {
  return (
    <div>
      <RegisterBox props={history} />
    </div>
  );
};

export default Signup;
