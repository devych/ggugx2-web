import axios from 'axios';

let jwtToken;

const checkValidJwt = token => {
  jwtToken = sessionStorage.getItem('token');

  axios
    .get(
      'http://ec2-13-115-51-251.ap-northeast-1.compute.amazonaws.com:3000/tests',
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => {
      console.log('success', res);
      //TODO: 이게 트루 리턴하게 하고 에러는 펄시한 값 리턴하게 만들어야함
    })
    .catch(err => {
      console.log('fail', err.response);
    });
};

export { checkValidJwt, jwtToken };
