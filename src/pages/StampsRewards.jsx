import React, { Component } from 'react';
import StampsReqList from '../components/molecules/stampsReqList';
// import RealTimeSetStamps from '../modules/RealTimeSetStamps';

// const socket = io(
//   'http://ec2-13-115-51-251.ap-northeast-1.compute.amazonaws.com:3000'
// );

class StampsRewards extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      storeId: 28,
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

    console.log(this.props);
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

export default StampsRewards;
