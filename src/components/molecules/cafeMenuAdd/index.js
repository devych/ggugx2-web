import React from 'react';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';

const CafeMenuAdd = () => {
  return (
    <tr>
      <td>
        <Input placeholder={'상품명'} />
      </td>
      <td>
        <Input placeholder={'가격'} />
      </td>
      <td>
        <Button children={'올리기'} />
      </td>
    </tr>
  );
};

export default CafeMenuAdd;
