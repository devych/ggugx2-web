/* eslint-disable indent */
import React from 'react';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';

const phoneSearchList = ({ phoneList, onChange }) => {
  console.log(phoneList);

  return (
    <table className="phoneSearchBox">
      <tbody>
        <tr>
          <td colSpan="2">
            <Input
              type="text"
              placeholder="휴대폰 번호 뒤 네자리"
              onChange={onChange}
            />
            <Button>검색</Button>
          </td>
        </tr>
      </tbody>
      <tbody className="phoneSearch">
        {phoneList ? (
          phoneList.map(item => (
            <tr key={item.phone} className={item.phone}>
              <td>{item.name}고객님</td>
              <td>{item.phone}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>검색 결과가 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default phoneSearchList;
