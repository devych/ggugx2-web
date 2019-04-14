import React from 'react';

const contentBox = ({ contentTitle, contentImg }) => {
  return (
    <span>
      <h3>{contentTitle}</h3>
      <img src={contentImg} alter={contentTitle} />
    </span>
  );
};

export default contentBox;
