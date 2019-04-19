import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import impAxiosDefault from '../src/modules/impAxiosDefault';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Mainpage from './pages/Mainpage';
import Caffeinfo from './pages/Caffeinfo';
import Caffemenu from './pages/Caffemenu';
import Nav from './components/atoms/nav';
import ShopMng from './components/organisms/shopMng';
import StampsRewards from './pages/StampsRewards';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path="/" component={Signin} />
          <Switch>
            <Route path="/Mainpage" component={Mainpage} />
            <Route path="/StampsRewards" component={StampsRewards} />
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
