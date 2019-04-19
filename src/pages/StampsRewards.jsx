import React, { Component } from 'react';
import io from 'socket.io-client';
import Button from '../components/atoms/button/index';
// import RealTimeSetStamps from '../modules/RealTimeSetStamps';

const socket = io('http://localhost:4000');

class StampsRewards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storeId: 28,
      storeName: 'gain',
      messages: [],
      msg: [],
      exmsg: [],
      stampConfirmMsg: null,
      identification: [],
      identifyNum: 0
    };
    // connectSocket(this.state.storeName);
    this.RealTimeSetStamps(this.state.storeName);
  }

  connectSocket(storeId) {
    console.log('connecting socket');
    let userinfo = { id: storeId };
    socket.emit('register', userinfo);
  }

  stampConfirm(e) {
    e.preventDefault();
    console.log(e);
    console.log(this.state.msg.customer);
    socket.emit('stamp confirm from store', {
      store: this.state.storeId,
      customer: this.state.msg[0].customer,
      confirm: true
    });
  }

  RealTimeSetStamps = storeId => {
    socket.on('stamp confirm to store', msg => {
      console.log(msg);
      this.setState(
        {
          msg: this.state.msg.concat(msg),
          messages: this.state.messages.concat(
            `[stamp confirm] ${msg.customer} 고객님이 쿠폰 적립을 요청했습니다!`
          )
        },
        () => {
          this.setState(
            {
              identification: this.state.identification.concat([
                [
                  this.state.msg[this.state.identifyNum].customer,
                  this.state.identifyNum
                ]
              ]),
              identifyNum: this.state.identifyNum + 1
            },
            () => {
              console.log('identification =>', this.state.identification);
              console.log('identifyNum =>', this.state.identifyNum);
            }
          );
        }
      );
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('stamp add complete', msg => {
      this.setState({
        msg: this.state.msg.concat(msg),
        messages: this.state.messages.concat(
          `[complete] ${msg.customer} 고객님의 적립이 완료되었습니다.`
        )
      });
      window.scrollTo(0, document.body.scrollHeight);
    });
  };
  //Todo: 아직 버그가 많습니다. 더 고칩시다.
  componentDidMount() {
    this.connectSocket(this.state.storeName);
  }

  render() {
    const { storeName, messages } = this.state;
    return (
      <div className="StampsRewards">
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js" /> */}
        <div className="etcSpace">빈 공간</div>
        <div className="Stamps">
          <h3 id="id-header">{storeName} 쿠폰 적립 요청 리스트</h3>
          {messages &&
            messages.map(message => (
              <ul id={this.state.messages.length}>
                {message}
                <Button onClick={e => this.stampConfirm(e)}>승인</Button>
              </ul>
            ))}
        </div>
        <div className="Rewards">
          <div>교환권 승인 요청 리스트</div>
          <span>이곳에는 교환권을 승인요청 리스트 페이지가 들어갑니다.</span>
        </div>
      </div>
    );
  }
}

export default StampsRewards;
