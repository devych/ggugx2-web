import React from 'react';
import './index.css';

const Input = ({
  type,
  accept,
  align,
  height,
  width,
  maxLength,
  placeholder,
  readOnly,
  value,
  onChange,
  className
}) => {
  return (
    <input
      type={type}
      accept={accept}
      align={align}
      height={height}
      width={width}
      maxLength={maxLength}
      placeholder={placeholder}
      readOnly={readOnly}
      value={value}
      onChange={onChange}
      className={`Input ${className}`}
    />
  );
};

export default Input;
