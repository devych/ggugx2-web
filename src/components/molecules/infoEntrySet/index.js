import React from 'react';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';

const InfoEntrySet = ({ label, className, placeholder, children }) => {
  return (
    <ul>
      {label} <Input placeholder={placeholder} className={className} />{' '}
      <Button children={children} />
    </ul>
  );
};

export default InfoEntrySet;
