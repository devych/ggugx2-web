import React from 'react';
import Button from '../../atoms/button/index';

const CafeMenuEntry = ({ itemName, price }) => {
  return (
    <tr>
      <td>{itemName}</td>
      <td> {price}</td>
      <td>
        <Button children={'수정'} />
      </td>
    </tr>
  );
};

export default CafeMenuEntry;
