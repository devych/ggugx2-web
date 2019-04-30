import React, { Component } from 'react';
import Button from '../../atoms/button';
import './index.css';

class StampsReqList extends Component {
  render() {
    const { req, onClick } = this.props;

    return req.type === 'stampAdd' || req.type === 'rewardUseComplete' ? (
      <ul id={req.key} key={req.key}>
        {req.message}
      </ul>
    ) : (
      <ul id={req.key} key={req.key}>
        {req.message}
        <Button
          id={req.key}
          onClick={onClick}
          className="stamps-rewards-confirm-btn"
        >
          <img
            src="https://img.icons8.com/color/96/000000/checked.png"
            alt="confirm"
            width="30"
          />
        </Button>
      </ul>
    );
  }
}

export default StampsReqList;
