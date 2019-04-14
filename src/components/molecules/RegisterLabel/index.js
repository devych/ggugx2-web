import React from 'react';
import Input from '../../atoms/input/index';

const RegisterLabel = ({ label, className, placeholder }) => {
  return (
    <ul>
      {label} <Input placeholder={placeholder} className={className} />
    </ul>
  );
};

export default RegisterLabel;
