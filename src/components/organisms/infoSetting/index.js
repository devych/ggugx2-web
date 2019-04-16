import React from 'react';
import ImageBox from '../../molecules/imageBox/index';
import InfoEntrySet from '../../molecules/infoEntrySet/index';
import Button from '../../atoms/button/index';
import Select from '../../atoms/select/index';
import Input from '../../atoms/input/index';

const option = [
  { value: '아아', children: '아이스아메리카노' },
  { value: '아아', children: '뜨거운아메리카노' },
  { value: '아아', children: '미지근한아메리카노' }
];
const InfoSetting = () => {
  return (
    <span>
      <span>
        <ImageBox />
      </span>
      <span>
        <InfoEntrySet label={'가게주소'} children={'등록'} />
        <InfoEntrySet label={'가게번호'} children={'등록'} />
      </span>
      <span>
        <Select option={option} key={option} />
        <Input placeholder={'쿠폰갯수'} />
        <Button children={'등록'} />
      </span>
    </span>
  );
};

export default InfoSetting;
