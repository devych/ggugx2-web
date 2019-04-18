/* eslint-disable indent */
import React from 'react';
import Input from '../../atoms/input/index';

const phoneSearchList = ({ phoneList, onChange }) => {
  return (
    <span className="phoneSearchBox">
      <Input type="text" placeholder="휴대폰 번호" onChange={onChange} />
      <span className="phoneSearch">
        {phoneList ? (
          phoneList.map(item => <ul key={item.phone}>{item.phone}</ul>)
        ) : (
          <h5>검색 결과가 없습니다.</h5>
        )}
      </span>
    </span>
  );
};

export default phoneSearchList;
