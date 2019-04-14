import React from 'react';

const Button = ({ type, onClick, disabled, classProps, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classProps}
    >
      {children}
    </button>
  );
};

export default Button;
