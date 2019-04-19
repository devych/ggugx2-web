import React, { Component } from 'react';
import axios from 'axios';
import CafeMenuEntry from '../../molecules/cafeMenuEntry';
import CafeMenuAdd from '../../molecules/cafeMenuAdd';
import './index.css';

class CafeMenuEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storeId: 28,
      menu: null
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/menus')
      .then(res => {
        var thisMenu = res.data.filter(
          item => item.store_id === this.state.storeId
        );
        this.setState({ menu: thisMenu[0].menu }, () =>
          console.log(this.state.menu)
        );
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  render() {
    const { menu } = this.state;

    if (this.state.menu === null) {
      return <div>wait a seconds</div>;
    }
    return (
      <span className="cafeMenu">
        <table className="cafeMenuSet">
          <tr>
            <th>메뉴</th>
            <th>가격</th>
            <th>수정버튼</th>
          </tr>
          {menu &&
            menu.map(item => (
              <CafeMenuEntry itemName={item.name} price={item.price} />
            ))}
          <CafeMenuAdd />
        </table>
      </span>
    );
  }
}

export default CafeMenuEdit;
