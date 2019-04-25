import React from 'react';
import './index.css';
import Input from '../../atoms/input/index';

const RegisterLabel = ({
  label,
  className,
  placeholder,
  onChange,
  type,
  subButton,
  subInput,
  value,
  readOnly
}) => {
  return (
    <tr className="registerLabel">
      <th className="label">{label}</th>
      <td>
        <Input
          readOnly={readOnly}
          placeholder={placeholder}
          type={type}
          className="registerInput"
          onChange={onChange}
          value={value}
        />
        {subButton ? subButton : null}
        {subInput ? subInput : null}
      </td>
    </tr>
  );
};

export default RegisterLabel;
