import React, { Component } from 'react';
import Button from '../../atoms/button';

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
        <Button id={req.key} onClick={onClick}>
          승인
        </Button>
      </ul>
    );
  }
}

export default StampsReqList;
