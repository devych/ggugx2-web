import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Mainpage from './pages/Mainpage';
import Caffeinfo from './pages/Caffeinfo';
import Caffemenu from './pages/Caffemenu';
import Nav from './components/atoms/nav';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path="/" component={Signin} />
          <Route path="/Mainpage" component={Mainpage} />
          <Route path="/Caffeinfo" component={Caffeinfo} />
          <Route path="/Caffemenu" component={Caffemenu} />
          <Route path="/Signin" component={Signin} />
          <Route path="/Signup" component={Signup} />
        </div>
      </Router>
    );
  }
}

export default App;
