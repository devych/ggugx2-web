import React, { Component } from 'react';
import axios from '../../../modules/impAxiosDefault';
import serverUrl from '../../../serverInfo';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';

class CafeMenuAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      price: null,
      storeId: sessionStorage.getItem('storeId')
    };
  }
  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onPriceChange = e => {
    this.setState({ price: e.target.value });
  };

  addMenuToServer = () => {
    const { name, price, storeId } = this.state;

    axios
      .post(`${serverUrl}/stores/menu`, {
        name: name,
        price: price,
        storeId: storeId
      })
      .then(res => {
        alert('메뉴가 추가되었습니다.');
        // console.log(res);
      })
      .then(() => {
        this.props.checkUpdateMenu();
      })
      .then(() => {
        this.setState({ name: '', price: '' });
      })
      .catch(err => {
        alert('메뉴가 정상적으로 추가되지 않았습니다.');
        console.log(err);
      });
  };

  render() {
    return (
      <tr>
        <td>
          <Input
            id="menuName"
            placeholder={'상품명'}
            onChange={this.onNameChange}
          />
        </td>
        <td>
          <Input
            id="menuPrice"
            placeholder={'가격'}
            onChange={this.onPriceChange}
          />
        </td>
        <td>
          <Button children={'올리기'} onClick={this.addMenuToServer} />
        </td>
      </tr>
    );
  }
}

export default CafeMenuAdd;
