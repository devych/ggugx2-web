import React from 'react';
import './index.css';
import Input from '../../atoms/input/index';

const RegisterLabel = ({ label, className, placeholder, onChange, type }) => {
  return (
    <tr className="registerLabel">
      <th className="label">{label}</th>{' '}
      <td>
        <Input
          placeholder={placeholder}
          type={type}
          className="registerInput"
          onChange={onChange}
        />
      </td>
    </tr>
  );
};

export default RegisterLabel;
