import React from 'react';
import Button from '../../atoms/button/index';

const CafeMenuEntry = ({ itemName, price, onClick }) => {
  return (
    <tr>
      <td className="itemName">{itemName}</td>
      <td className="itemPrice">{price}</td>
      <td>
        <Button id={itemName} onClick={onClick} children={'삭제'} />
      </td>
    </tr>
  );
};

export default CafeMenuEntry;
