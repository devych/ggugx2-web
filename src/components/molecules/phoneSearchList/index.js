/* eslint-disable indent */
import React from 'react';
import Input from '../../atoms/input/index';

const phoneSearchList = ({ phoneEntry }) => {
  return (
    <span className="phoneSearchBox">
      <Input type="text" placeholder="휴대폰 번호" />
      <span className="phoneSearch">
        {phoneEntry
          ? phoneEntry.map(item => (
              <ul key={item.phoneNumber}>{item.phoneNumber}</ul>
            ))
          : null}
      </span>
    </span>
  );
};

export default phoneSearchList;
