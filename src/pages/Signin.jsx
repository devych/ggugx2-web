import React, { Component } from 'react';
import LoginBox from '../components/molecules/loginBox';
import { withRouter } from 'react-router-dom';
class Signin extends Component {
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
