import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StampsReqList from '../components/molecules/stampsReqList';
import PhoneSearchList from '../components/molecules/phoneSearchList';

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
        <PhoneSearchList className="PhoneSearchList" />
        <div className="Stamps">
          <h3 id="id-header" className="stamps-rewards-title">
            스탬프 적립 요청
          </h3>
          <hr />
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
          <h3 id="id-header" className="stamps-rewards-title">
            교환권 사용 요청
          </h3>
          <hr />
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
