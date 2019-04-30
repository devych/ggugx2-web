import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from './modules/impAxiosDefault';
import serverUrl from './serverInfo';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Mainpage from './pages/Mainpage';
import Caffeinfo from './pages/Caffeinfo';
import Caffemenu from './pages/Caffemenu';
import Nav from './components/atoms/nav';
import ShopMng from './components/organisms/shopMng';
import StampsRewards from './pages/StampsRewards';
import Button from './components/atoms/button';

const socket = io(`${serverUrl}`);
// const socket = io(`http://localhost:3000`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      loginInfo: null,
      storeName: sessionStorage.getItem('storeName') || null,
      storeId: sessionStorage.getItem('storeId') || null,
      stampsUseReq: [],
      rewardsUseReq: [],
      reqErr: []
    };
    this.state.storeId && this.RealTimeSetStamps();
    this.stampConfirm = this.stampConfirm.bind(this);
    this.rewardConfirm = this.rewardConfirm.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  checkLogin = () => {
    //tokenTest하는부분 넣고
    this.setState({ isLogin: true });
  };

  checkLogout = () => {
    console.log('logout했습니다');
    if (this.state.isLogin) {
      this.setState({ isLogin: false }, () => {
        sessionStorage.removeItem('storeId');
        sessionStorage.removeItem('storeName');
        sessionStorage.removeItem('token');
        alert('LogOut했습니다.');
      });
    }
  };
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
      let key = `${msg.customer}${new Date().getTime()}`;
      this.setState(
        {
          stampsUseReq: this.state.stampsUseReq.concat({
            customer: msg.customer,
            type: 'stampRequest',
            message: `[stamp confirm] ${
              msg.customerName
            } 고객님이 쿠폰 적립을 요청했습니다!`,
            key: `${msg.customer}${new Date().getTime()}`,
            time: this.getTime(1)
          })
        },
        () => {
          this.stampsUseNotify(msg, key);
        }
      );

      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('stamp add complete', msg => {
      this.setState({
        stampsUseReq: this.state.stampsUseReq.concat({
          customer: msg.customer,
          type: 'stampAdd',
          message: `[complete] ${
            msg.customerName
          } 고객님의 적립이 완료되었습니다.`,
          key: `${msg.customer}${new Date().getTime()}`,
          time: this.getTime(1)
        })
      });
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('reward confirm to store', msg => {
      let key = `${msg.customer}${new Date().getTime()}`;
      this.setState(
        {
          rewardsUseReq: this.state.rewardsUseReq.concat({
            customer: msg.customer,
            type: 'rewardUseRequest',
            message: `[stamp confirm] ${
              msg.customerName
            } 고객님이 교환권 사용을 요청했습니다!`,
            key: `${msg.customer}${new Date().getTime()}`,
            time: this.getTime(1)
          })
        },
        () => {
          console.log(this.state.rewardsUseReq);
          this.rewardsUseNotify(msg, key);
        }
      );
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('reward use complete', msg => {
      this.setState({
        rewardsUseReq: this.state.rewardsUseReq.concat({
          customer: msg.customer,
          type: 'rewardUseComplete',
          message: `[reward use complete] ${
            msg.customerName
          } 고객님의 교환권 사용이 완료되었습니다.`,
          key: `${msg.customer}${new Date().getTime()}`,
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
          key: `${msg.customer}${new Date().getTime()}`,
          time: this.getTime(1)
        })
      });
      window.scrollTo(0, document.body.scrollHeight);
    });
  };

  componentDidMount() {
    this.connectSocket(this.state.storeId);
  }

  stampsUseNotify = (msg, key) => {
    toast(
      <div>
        <div>
          [stamp confirm] {msg.customerName} 고객님이 쿠폰 적립을 요청했습니다!
        </div>
        <Button id={key} onClick={this.stampConfirm}>
          적립하기
        </Button>
      </div>
    );
  };

  rewardsUseNotify = (msg, key) => {
    toast(
      <div>
        <div>
          [reward confirm] {msg.customerName} 고객님이 교환권 사용을
          요청했습니다!
        </div>
        <Button id={key} onClick={this.rewardConfirm}>
          허락하기
        </Button>
      </div>
    );
  };

  render() {
    return (
      <Router>
        <div>
          {this.state.isLogin ? <Nav storeName={this.state.storeName} /> : null}
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Signin history={this.history} checkLogin={this.checkLogin} />
              )}
            />
            <Route path="/Mainpage" component={Mainpage} />
            <Route
              path="/StampsRewards"
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
            <Route
              path="/Signin"
              render={() => (
                <Signin history={this.history} checkLogin={this.checkLogin} />
              )}
            />
            {/* <Route path="/Signin" component={Signin} /> */}
            <Route path="/Signup" component={Signup} />
          </Switch>
          <ToastContainer
            className="toast"
            draggable={false}
            autoClose={5000}
            position={'bottom-right'}
            hideProgressBar={false}
          />
        </div>
      </Router>
    );
  }
}

export default App;
