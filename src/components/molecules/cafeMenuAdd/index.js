import React from 'react';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';

const CafeMenuAdd = () => {
  return (
    <ul>
      <Input placeholder={'상품명'} />
      <Input placeholder={'가격'} />
      <Button children={'올리기'} />
    </ul>
  );
};

export default CafeMenuAdd;
