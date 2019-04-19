import io from 'socket.io-client';

/* <h1 id="id-header"></h1>

<ul id="messages"></ul> */

// var id = prompt('매장 아이디를 입력해주세요');
// var h1 = document.getElementById('id-header');
// h1.innerText = `${id} 사장님 안녕하세요!`;
const RealTimeSetStamps = storeId => {
  console.log('connecting socket');
  var socket = io('http://localhost:4000');

  let userinfo = { id: storeId };
  socket.emit('register', userinfo);

  socket.on('stamp confirm to store', msg => {
    this.setState({ msg: msg }, () => {
      this.setState({
        stampConfirmMsg: `[stamp confirm] ${
          msg.customer
        } 고객님이 쿠폰 적립을 요청했습니다!`
      });
    });
    // let messages = document.getElementById('messages');
    // let li = document.createElement('li');
    // let button = document.createElement('button');
    // button.innerText = `승인!`;
    // button.onclick = function(e) {
    //   e.preventDefault();
    //   socket.emit('stamp confirm from store', {
    //     store: storeId,
    //     customer: msg.customer,
    //     confirm: true
    //   });
    // };
    window.scrollTo(0, document.body.scrollHeight);
  });

  socket.on('stamp add complete', msg => {
    let messages = document.getElementById('messages');
    let li = document.createElement('li');

    li.innerText = `[complete] ${msg.customer} 고객님의 적립이 완료되었습니다.`;
    messages.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
  });
};

export default RealTimeSetStamps;
