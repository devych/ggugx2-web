import React from 'react';
import './index.css';

const Button = ({ type, onClick, disabled, className, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
