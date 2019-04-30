import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
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
import checkValidJwt from './modules/checkValidJwt';

const socket = io(`${serverUrl}`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      showNav: false,
      storeName: sessionStorage.getItem('storeName') || null,
      storeId: sessionStorage.getItem('storeId') || null,
      stampsUseReq: [],
      rewardsUseReq: [],
      reqErr: []
    };

    if (sessionStorage.getItem('storeId')) {
      this.setState({ isLogin: true });
    }
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

  getIndexWithoutEvent = (arr, key) => {
    let index;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key === key) {
        index = i;
      }
    }
    return index > -1
      ? arr.splice(index, 1)
      : new Error('키가 올바르지 않습니다.');
  };

  stampConfirm(e) {
    e.preventDefault();
    let stampReqListArr = JSON.parse(JSON.stringify(this.state.stampsUseReq));
    let matchData = stampReqListArr.filter(item => item.key === e.target.id);

    socket.emit('stamp confirm from store', {
      store: this.state.storeId,
      customer: matchData[0].customer,
      confirm: true
    });
    this.NotifyDismiss(e.target.id);
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
    this.NotifyDismiss(e.target.id);
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
            message: `${msg.customerName}님의 요청`,
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
      let key = `${msg.customer}${new Date().getTime()}`;
      this.setState(
        {
          stampsUseReq: this.state.stampsUseReq.concat({
            customer: msg.customer,
            type: 'stampAdd',
            message: `[완료] ${msg.customerName}님`,
            key: `${msg.customer}${new Date().getTime()}`,
            time: this.getTime(1)
          })
        },
        () => {
          setTimeout(() => {
            let stampsReqListArr = JSON.parse(
              JSON.stringify(this.state.stampsUseReq)
            );
            this.getIndexWithoutEvent(stampsReqListArr, key);
            this.setState({ stampsUseReq: stampsReqListArr });
          }, 10000);
        }
      );
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('reward confirm to store', msg => {
      let key = `${msg.customer}${new Date().getTime()}`;
      this.setState(
        {
          rewardsUseReq: this.state.rewardsUseReq.concat({
            customer: msg.customer,
            type: 'rewardUseRequest',
            message: `${msg.customerName}님의 요청`,
            key: `${msg.customer}${new Date().getTime()}`,
            time: this.getTime(1)
          })
        },
        () => {
          this.rewardsUseNotify(msg, key);
        }
      );
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('reward use complete', msg => {
      let key = `${msg.customer}${new Date().getTime()}`;
      this.setState(
        {
          rewardsUseReq: this.state.rewardsUseReq.concat({
            customer: msg.customer,
            type: 'rewardUseComplete',
            message: `[완료] ${msg.customerName}님`,
            key: `${msg.customer}${new Date().getTime()}`,
            time: this.getTime(1)
          })
        },
        () => {
          setTimeout(() => {
            let rewardsReqListArr = JSON.parse(
              JSON.stringify(this.state.rewardsUseReq)
            );
            this.getIndexWithoutEvent(rewardsReqListArr, key);
            this.setState({ rewardsUseReq: rewardsReqListArr });
          }, 10000);
        }
      );
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
    this.setState({ showNav: !this.state.showNav }, () => {
      if (sessionStorage.getItem('storeId')) {
        this.setState({ isLogin: true });
      }
    });
  }

  stampsUseNotify = (msg, key) => {
    toast(
      <div>
        {/* <div className="TextInToast">{msg.customerName}님의 스탬프 적립 요청</div> */}
        <Button id={key} onClick={this.stampConfirm} className="buttonInToast">
          {msg.customerName}님의 스탬프 적립 수락
        </Button>
      </div>,
      { toastId: key }
    );
  };

  rewardsUseNotify = (msg, key) => {
    toast(
      <div>
        {/* <div className="TextInToast">{msg.customerName}님의 교환권 사용 요청</div> */}
        <Button id={key} onClick={this.rewardConfirm} className="buttonInToast">
          {msg.customerName}님의 교환권 사용 수락
        </Button>
      </div>,
      { toastId: key }
    );
  };

  NotifyDismiss = key => {
    toast.dismiss(key);
  };

  render() {
    const { isLogin } = this.state;
    const checkJwt = sessionStorage.getItem('token');
    return (
      <Router>
        <div id="appContainer">
          {!isLogin && !checkJwt ? null : (
            <Nav storeName={this.state.storeName} />
          )}
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Signin history={this.history} checkLogin={this.checkLogin} />
              )}
            />

            <Route
              path="/Mainpage"
              render={() =>
                !isLogin && !checkJwt ? <Redirect to="/Signin" /> : <Mainpage />
              }
            />
            <Route
              path="/StampsRewards"
              render={() =>
                !isLogin && !checkJwt ? (
                  <Redirect to="/Signin" />
                ) : (
                  <StampsRewards
                    stampsUseReq={this.state.stampsUseReq}
                    rewardsUseReq={this.state.rewardsUseReq}
                    stampConfirm={this.stampConfirm}
                    rewardConfirm={this.rewardConfirm}
                  />
                )
              }
            />
            <Route
              path="/ShopMng"
              render={() =>
                !isLogin && !checkJwt ? <Redirect to="/Signin" /> : <ShopMng />
              }
            />
            <Route
              path="/Caffeinfo"
              render={() =>
                !isLogin && !checkJwt ? (
                  <Redirect to="/Signin" />
                ) : (
                  <Caffeinfo />
                )
              }
            />
            <Route
              path="/Caffemenu"
              render={() =>
                !isLogin && !checkJwt ? (
                  <Redirect to="/Signin" />
                ) : (
                  <Caffemenu />
                )
              }
            />
            <Route
              path="/Signin"
              render={() => (
                <Signin history={this.history} checkLogin={this.checkLogin} />
              )}
            />
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
