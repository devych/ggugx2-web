import React, { Component } from 'react';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Mainpage from './pages/Mainpage';
import Caffeinfo from './pages/Caffeinfo';
import Caffemenu from './pages/Caffemenu';
// ----------------------------------------
import RegisterBox from './components/molecules/RegisterBox/index';
import LoginBox from './components/molecules/loginBox/index';
import Select from './components/atoms/select/index.js';

const options = [
  { value: 'item1', children: 'item1' },
  { value: 'item2', children: 'item2' },
  { value: 'item3', children: 'item3' },
  { value: 'item4', children: 'item4' },
  { value: 'item5', children: 'item5' },
  { value: 'item6', children: 'item6' }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Signin />
        <Signup />
        <Mainpage />
      </div>
    );
  }
}

export default App;
