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
      {option.map(item => (
        <option value={item.value} children={item.children} />
      ))}
    </select>
  );
};

export default Select;
