/* eslint-disable indent */
import React from 'react';
import Option from '../option/index';

const Select = ({
  autoFocus,
  disabled,
  form,
  multiple,
  name,
  require,
  onChange,
  option
}) => {
  return (
    <select
      autoFocus={autoFocus}
      disabled={disabled}
      form={form}
      multiple={multiple}
      name={name}
      require={require}
      onChange={onChange}
    >
      {option
        ? option.map(item => (
            <Option value={item.name} children={item.name} key={item.name} />
          ))
        : null}
    </select>
  );
};

export default Select;
