import React from 'react';
import CafeMenuEntry from '../../molecules/cafeMenuEntry';
import CafeMenuAdd from '../../molecules/cafeMenuAdd';

const CafeMenuEdit = () => {
  return (
    <span>
      <h3>메뉴</h3> <h3>가격</h3>
      <CafeMenuEntry />
      <br />
      <CafeMenuAdd />
    </span>
  );
};

export default CafeMenuEdit;
