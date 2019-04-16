import React from 'react';
import './index.css';
import Input from '../../atoms/input/index';

const RegisterLabel = ({ label, className, placeholder }) => {
  return (
    <ul className="registerLabel">
      <h3 className="label">{label}</h3>{' '}
      <Input placeholder={placeholder} className="registerInput" />
    </ul>
  );
};

export default RegisterLabel;
