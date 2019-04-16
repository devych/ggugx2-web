import React from 'react';
import MainNavBar from '../components/molecules/mainNavBar/index';
import PhoneSearchList from '../components/molecules/phoneSearchList/index';
import SubNavBar from '../components/molecules/subNavBar/index';
import InfoSetting from '../components/organisms/infoSetting/index';

const Caffeinfo = () => {
  return (
    <div>
      <h1>매장관리</h1>

      <MainNavBar />
      <PhoneSearchList />

      <span>
        <SubNavBar />

        <br />
        <h3>정보수정</h3>
        <br />

        <InfoSetting />
      </span>
    </div>
  );
};

export default Caffeinfo;
