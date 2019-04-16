import React from 'react';
import MainNavBar from '../../molecules/mainNavBar';
import PhoneSearchList from '../../molecules/phoneSearchList';
import ContentsList from '../contentsList';
import './index.css';

const phoneEntry = [
  { phoneNumber: '010-8381-3829' },
  { phoneNumber: '010-8374-3829' },
  { phoneNumber: '010-3715-3829' },
  { phoneNumber: '010-2938-3829' }
];

const mainPage = () => {
  return (
    <div className="MainPage">
      <h1>MainPage</h1>
      <PhoneSearchList phoneEntry={phoneEntry} className="PhoneSearchList" />
      <ContentsList />
    </div>
  );
};

export default mainPage;
