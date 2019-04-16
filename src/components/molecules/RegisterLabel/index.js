import React from 'react';
import './index.css';
import Input from '../../atoms/input/index';

const RegisterLabel = ({ label, className, placeholder, onChange, type }) => {
  return (
    <ul className="registerLabel">
      <h3 className="label">{label}</h3>{' '}
      <Input
        placeholder={placeholder}
        type={type}
        className="registerInput"
        onChange={onChange}
      />
    </ul>
  );
};

export default RegisterLabel;
