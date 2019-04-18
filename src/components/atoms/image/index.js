import React from 'react';
import './index.css';

const Image = ({ src, className, alt }) => {
  return <img src={src} className={className} alt={className} />;
};

export default Image;
