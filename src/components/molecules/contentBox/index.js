import React from 'react';

const ContentBox = ({ contentTitle, contentImg }) => {
  return (
    <span>
      <h3>{contentTitle}</h3>
      <img src={contentImg} alt={contentTitle} />
    </span>
  );
};

export default ContentBox;
