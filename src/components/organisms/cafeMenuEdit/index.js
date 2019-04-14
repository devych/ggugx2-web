import React from 'react';
import CafeMenuEntry from '../../molecules/cafeMenuEntry';
import CafeMenuAdd from '../../molecules/cafeMenuAdd';

const CafeMenuEdit = () => {
  return (
    <span>
      <a>메뉴</a> <a>가격</a>
      <CafeMenuEntry />
      <br />
      <CafeMenuAdd />
    </span>
  );
};

export default CafeMenuEdit;
