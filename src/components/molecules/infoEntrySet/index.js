import React from 'react';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';

const InfoEntrySet = ({ label, className, placeholder, children }) => {
  return (
    <tr>
      <td>{label}</td>{' '}
      <td>
        <Input placeholder={placeholder} className={className} />
      </td>
      <td>
        <Button children={children} />
      </td>
    </tr>
  );
};

export default InfoEntrySet;
