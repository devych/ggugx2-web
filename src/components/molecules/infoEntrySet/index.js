import React from 'react';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';

const InfoEntrySet = ({ label, className, placeholder }) => {
  return (
    <ul>
      {label} <Input placeholder={placeholder} className={className} />{' '}
      <Button />
    </ul>
  );
};

export default InfoEntrySet;
