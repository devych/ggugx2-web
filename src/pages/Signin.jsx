import React, { Component } from 'react';
import LoginBox from '../components/molecules/loginBox';
import { withRouter } from 'react-router-dom';
class Signin extends Component {
  constructor(props) {
    super(props);
    sessionStorage.removeItem('storeId');
    sessionStorage.removeItem('storeName');
    sessionStorage.removeItem('token');
  }

  render() {
    const { history, checkLogin } = this.props;
    return (
      <div>
        <LoginBox history={history} checkLogin={checkLogin} />
      </div>
    );
  }
}

export default withRouter(Signin);
