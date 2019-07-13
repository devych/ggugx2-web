import React from 'react';
import Image from '../../atoms/image/index';

const ImageBox = ({ imgs }) => {
  return (
    <span>
      {[imgs].map(img => (
        <Image src={img.imgUrl} className={'img'} key={img.imgUrl.slice(0)} />
      ))}
    </span>
  );
};

export default ImageBox;
