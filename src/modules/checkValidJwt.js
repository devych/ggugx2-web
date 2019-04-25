import axios from 'axios';

// let jwtToken;

const checkValidJwt = () => {
  let jwtToken = sessionStorage.getItem('token');
  axios
    .get(
      'http://ec2-13-115-51-251.ap-northeast-1.compute.amazonaws.com:3000/tests',
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    )
    .then(res => {
      console.log('success', res);
      console.log('TCL: checkValidJwt -> isLogin', true);
      return true;
      //TODO: 이게 트루 리턴하게 하고 에러는 펄시한 값 리턴하게 만들어야함
    })
    .catch(err => {
      console.log('fail', err.response.data.message);
      return false;
    });
};

export { checkValidJwt };
