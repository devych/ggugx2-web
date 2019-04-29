import React, { Component } from 'react';
import PhoneSearchList from '../../molecules/phoneSearchList';
import ContentsList from '../contentsList';
import './index.css';

class mainPage extends Component {
  render() {
    return (
      <div className="MainPage">
        <h1>MainPage</h1>
        <PhoneSearchList className="PhoneSearchList" />
        <ContentsList />
      </div>
    );
  }
}

export default mainPage;
