import React from 'react';
import Image from '../../atoms/image/index';

const imageBox = ({ imgs }) => {
  return (
    <span>
      <Image src={imgs} />
      <Image src={imgs} />
      <Image src={imgs} />
    </span>
  );
};

export default imageBox;
