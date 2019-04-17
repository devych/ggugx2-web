import React from 'react';
import CafeMenuEntry from '../../molecules/cafeMenuEntry';
import CafeMenuAdd from '../../molecules/cafeMenuAdd';
import './index.css';

const CafeMenuEdit = () => {
  return (
    <span className="cafeMenu">
      <span>메뉴</span> <span>가격</span>
      <span>
        <CafeMenuEntry />
      </span>
      <CafeMenuAdd />
    </span>
  );
};

export default CafeMenuEdit;
