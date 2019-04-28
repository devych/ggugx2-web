import React from 'react';
import './index.css';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';

const InfoEntrySet = ({
  label,
  className,
  placeholder,
  children,
  value,
  onClick,
  onChange
}) => {
  return (
    <tr>
      <td>{label}</td>
      <td className="infoInput">
        <Input
          placeholder={placeholder}
          className={className}
          value={value}
          onChange={onChange}
        />
      </td>
      <td>
        <Button children={children} onClick={onClick} />
      </td>
    </tr>
  );
};

export default InfoEntrySet;
