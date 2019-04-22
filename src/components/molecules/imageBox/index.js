import React from 'react';
import Image from '../../atoms/image/index';

const ImageBox = ({ imgs }) => {
  return (
    <span>
      {imgs.map(img => (
        <Image src={img} className={'img'} key={img.slice(40, 45)} />
      ))}
    </span>
  );
};

export default ImageBox;
