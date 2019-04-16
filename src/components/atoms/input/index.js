import React from 'react';

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
  onChange
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
    />
  );
};

export default Input;
