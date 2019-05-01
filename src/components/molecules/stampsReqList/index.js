import React, { Component } from 'react';
import Button from '../../atoms/button';
import './index.css';

class StampsReqList extends Component {
  render() {
    const { req, onClick } = this.props;

    return req.type === 'stampAdd' || req.type === 'rewardUseComplete' ? (
      <ul id={req.key} key={req.key}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="./check.png"
            alt="chat bubble"
            width="18"
            style={{ marginRight: '5px' }}
          />
          {req.message}
        </div>
      </ul>
    ) : (
      <ul id={req.key} key={req.key}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <div style={{ marginRight: '2px' }}>
            <img
              src="https://img.icons8.com/ios-glyphs/30/00bf92/filled-topic.png"
              alt="chat bubble"
              width="18"
            />
          </div>
          <div style={{ marginRight: '5px' }}>{req.message}</div>
          <div
            style={{
              overflow: 'hidden',
              flex: 1,
              backgroundImage: 'url(./dotdotdot.png)',
              backgroundSize: 'contain',
              height: '10px'
            }}
          />
          <Button
            id={req.key}
            onClick={onClick}
            className="stamps-rewards-confirm-btn"
          >
            <img src="icon-confirm.png" alt="confirm" width="30" id={req.key} />
          </Button>
        </div>
      </ul>
    );
  }
}

export default StampsReqList;
