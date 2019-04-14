import React from 'react';
import MainNavBar from '../components/molecules/mainNavBar/index';
import PhoneSearchList from '../components/molecules/phoneSearchList/index';

const Caffeinfo = () => {
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
        <a>정보수정</a>
        <br />

        <span>
          <img
            src="https://picsart.com/i/image-caffe-art-210863284002202"
            alt="img"
          />
        </span>
        <span>
          <img
            src="https://picsart.com/i/image-caffe-art-210863284002202"
            alt="img"
          />
        </span>
        <span>
          <img
            src="https://picsart.com/i/image-caffe-art-210863284002202"
            alt="img"
          />
        </span>
        <br />

        <a>가게주소</a>
        <input placeholder="address" />
        <button>등록</button>
        <br />
        <a>가게전화번호</a>
        <input placeholder="contact" />
        <button>등록</button>
        <br />

        <span>
          <select>
            <option>아아</option>
            <option>뜨아</option>
            <option>아라</option>
            <option>뜨라</option>
          </select>
          <input placeholder="교환 쿠폰 갯수" />
          <button>등록</button>
        </span>
      </span>
    </div>
  );
};

export default Caffeinfo;
