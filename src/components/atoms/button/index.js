import React from 'react';
import './index.css';

const Button = ({ id, type, onClick, disabled, className, children }) => {
  return (
    <button
      id={id}
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
