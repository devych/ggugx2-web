import React from 'react';
import MainNavBar from '../components/molecules/mainNavBar/index';
import PhoneSearchList from '../components/molecules/phoneSearchList/index';
import ContentsList from '../components/organisms/contentsList/index';

const Mainpage = () => {
  return (
    <div>
      <h1>MainPage</h1>

      <MainNavBar />
      <PhoneSearchList />
      <ContentsList />
    </div>
  );
};

export default Mainpage;
