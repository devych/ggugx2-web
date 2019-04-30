import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StampsReqList from '../components/molecules/stampsReqList';

class StampsRewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeId: sessionStorage.getItem('storeId'),
      storeName: 1
    };
  }
  render() {
    const {
      stampsUseReq,
      rewardsUseReq,
      stampConfirm,
      rewardConfirm
    } = this.props;
    return (
      <div className="StampsRewards">
        <div className="Stamps">
          <h3 id="id-header">쿠폰 적립 리스트</h3>
          {stampsUseReq &&
            stampsUseReq.map(stampsReq => {
              return (
                <StampsReqList
                  req={stampsReq}
                  onClick={stampConfirm}
                  key={stampsReq.key}
                />
              );
            })}
        </div>
        <div className="Rewards">
          <h3 id="id-header">교환권 사용 리스트</h3>
          {rewardsUseReq &&
            rewardsUseReq.map(rewardsReq => {
              return (
                <StampsReqList
                  req={rewardsReq}
                  onClick={rewardConfirm}
                  key={rewardsReq.key}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default withRouter(StampsRewards);
