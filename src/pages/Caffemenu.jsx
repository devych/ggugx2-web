import React from 'react';
import MainNavBar from '../components/molecules/mainNavBar/index';
import PhoneSearchList from '../components/molecules/phoneSearchList/index';
import SubNavBar from '../components/molecules/subNavBar/index';
import CafeMenuEdit from '../components/organisms/cafeMenuEdit';

const Caffemenu = () => {
  return (
    <div>
      <h1>매장관리</h1>

      <MainNavBar />
      <PhoneSearchList />

      <span>
        <SubNavBar />
        <br />
        <a>메뉴수정</a>
        <br />

        <CafeMenuEdit />
      </span>
    </div>
  );
};

export default Caffemenu;
