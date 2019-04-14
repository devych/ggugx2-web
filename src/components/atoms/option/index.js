import React from 'react';

const Option = ({ value, children }) => {
  {
    console.log(value, children);
  }
  return <option value={value}>{children}</option>;
};

export default Option;
