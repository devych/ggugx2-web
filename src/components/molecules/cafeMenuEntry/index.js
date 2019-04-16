import React from 'react';
import Button from '../../atoms/button/index';

const CafeMenuEntry = ({ itemName, price }) => {
  return (
    <ul>
      {itemName} {price} <Button children={'수정'} />
    </ul>
  );
};

export default CafeMenuEntry;
