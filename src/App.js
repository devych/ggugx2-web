import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import serverUrl from './serverInfo';
import impAxiosDefault from '../src/modules/impAxiosDefault';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Mainpage from './pages/Mainpage';
import Caffeinfo from './pages/Caffeinfo';
import Caffemenu from './pages/Caffemenu';
import Nav from './components/atoms/nav';
import ShopMng from './components/organisms/shopMng';
import StampsRewards from './pages/StampsRewards';

// const socket = io('http://localhost:4000');

const socket = io(`${serverUrl}`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInfo: null,
      storeId: 1,
      stampsUseReq: [],
      rewardsUseReq: [],
      reqErr: []
    };
    this.state.storeId && this.RealTimeSetStamps();
    this.stampConfirm = this.stampConfirm.bind(this);
    this.rewardConfirm = this.rewardConfirm.bind(this);
  }

  connectSocket(storeId) {
    let userinfo = { id: storeId, type: 'store' };
    socket.emit('register', userinfo);
  }

  getIndex(arr, event) {
    let index;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key === event.target.id) {
        index = i;
      }
    }
    return index > -1
      ? arr.splice(index, 1)
      : new Error('키가 올바르지 않습니다.');
  }

  stampConfirm(e) {
    e.preventDefault();
    let stampReqListArr = JSON.parse(JSON.stringify(this.state.stampsUseReq));
    let matchData = stampReqListArr.filter(item => item.key === e.target.id);

    socket.emit('stamp confirm from store', {
      store: this.state.storeId,
      customer: matchData[0].customer,
      confirm: true
    });

    this.getIndex(stampReqListArr, e);
    this.setState({ stampsUseReq: stampReqListArr });
  }

  //TODO: 보상권 사용하는 버튼입니다
  rewardConfirm(e) {
    e.preventDefault();
    let rewardReqListArr = JSON.parse(JSON.stringify(this.state.rewardsUseReq));
    let matchData = rewardReqListArr.filter(item => item.key === e.target.id);

    socket.emit('reward confirm from store', {
      store: this.state.storeId,
      customer: matchData[0].customer,
      confirm: true
    });

    this.getIndex(rewardReqListArr, e);
    this.setState({ rewardsUseReq: rewardReqListArr });
  }

  getTime(korean) {
    let time;
    return korean
      ? (time = `${new Date().getHours()}시${new Date().getMinutes()}분${new Date().getSeconds()}초`)
      : (time = `${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`);
  }

  RealTimeSetStamps = () => {
    socket.on('stamp confirm to store', msg => {
      this.setState({
        stampsUseReq: this.state.stampsUseReq.concat({
          customer: msg.customer,
          type: 'stampRequest',
          message: `[stamp confirm] ${
            msg.customer
          } 고객님이 쿠폰 적립을 요청했습니다!`,
          key: `${msg.customer}${this.getTime()}`,
          time: this.getTime(1)
        })
      });
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('stamp add complete', msg => {
      this.setState({
        stampsUseReq: this.state.stampsUseReq.concat({
          customer: msg.customer,
          type: 'stampAdd',
          message: `[complete] ${msg.customer} 고객님의 적립이 완료되었습니다.`,
          key: `${msg.customer}${this.getTime()}`,
          time: this.getTime(1)
        })
      });
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('reward confirm to store', msg => {
      this.setState({
        rewardsUseReq: this.state.rewardsUseReq.concat({
          customer: msg.customer,
          type: 'rewardUseRequest',
          message: `[stamp confirm] ${
            msg.customer
          } 고객님이 교환권 사용을 요청했습니다!`,
          key: `${msg.customer}${this.getTime()}`,
          time: this.getTime(1)
        })
      });
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('reward use complete', msg => {
      this.setState({
        rewardsUseReq: this.state.rewardsUseReq.concat({
          customer: msg.customer,
          type: 'rewardUseComplete',
          message: `[reward use complete] ${
            msg.customer
          } 고객님의 교환권 사용이 완료되었습니다.`,
          key: `${msg.customer}${this.getTime()}`,
          time: this.getTime(1)
        })
      });
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('errors', msg => {
      this.setState({
        reqErr: this.state.reqErr.concat({
          customer: msg.customer,
          type: 'error',
          message: `[error] ${msg.message}`,
          key: `${msg.customer}${this.getTime()}`,
          time: this.getTime(1)
        })
      });
      window.scrollTo(0, document.body.scrollHeight);
    });
  };

  componentDidMount() {
    this.connectSocket(this.state.storeId);
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path="/" component={Signin} />
          <Switch>
            <Route path="/Mainpage" component={Mainpage} />
            <Route
              path="/StampsRewards/"
              render={() => (
                <StampsRewards
                  stampsUseReq={this.state.stampsUseReq}
                  rewardsUseReq={this.state.rewardsUseReq}
                  stampConfirm={this.stampConfirm}
                  rewardConfirm={this.rewardConfirm}
                />
              )}
            />
            <Route path="/ShopMng" component={ShopMng} />
            <Route path="/Caffeinfo" component={Caffeinfo} />
            <Route path="/Caffemenu" component={Caffemenu} />
            <Route path="/Signin" component={Signin} />
            <Route path="/Signup" component={Signup} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
