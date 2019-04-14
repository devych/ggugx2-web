import React from 'react';
import MainNavBar from '../components/molecules/mainNavBar/index';
import PhoneSearchList from '../components/molecules/phoneSearchList/index';

const Caffemenu = () => {
  return (
    <div>
      <h1>매장관리</h1>

      <MainNavBar />
      <PhoneSearchList />

      <span>
        <span>
          <a>정보수정</a>
          <a>메뉴수정</a>
          <a>이벤트관리</a>
        </span>
        <br />
        <a>메뉴수정</a>
        <br />

        <span>
          <a>메뉴</a> <a>가격</a>
          <br />
          <input placeholder="제품명" />
          <input placeholder="금액" />
          <button>수정</button>
        </span>
        <br />
        <span>
          <input placeholder="제품명" />
          <input placeholder="금액" />
          <button>올리기</button>
        </span>
      </span>
    </div>
  );
};

export default Caffemenu;
