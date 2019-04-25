import React from 'react';
//TODO: 이부분은 전혀 정리가 되어 있지 않다. 회원가입 인풋 정리할때 다시 작성해야함
const Weekday = ({ mon, tues, weds, thurs, fri, sat, sun }) => {
  return (
    <span>
      <input type="checkbox" value="월" name="월" />월
      <input type="checkbox" value="화" name="화" />화
      <input type="checkbox" value="수" name="수" />수
      <input type="checkbox" value="목" name="목" />목
      <input type="checkbox" value="금" name="금" />금
      <input type="checkbox" value="토" name="토" />토
      <input type="checkbox" value="일" name="일" />일
    </span>
  );
};

export default Weekday;
