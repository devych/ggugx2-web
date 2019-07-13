import React, { Component } from 'react';
import axios from '../../../modules/impAxiosDefault';
import CafeMenuEntry from '../../molecules/cafeMenuEntry';
import CafeMenuAdd from '../../molecules/cafeMenuAdd';
import './index.css';
import serverUrl from '../../../serverInfo';
class CafeMenuEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storeId: sessionStorage.getItem('storeId'),
      menu: null
    };
  }

  componentDidMount() {
    this.checkUpdateMenu();
  }

  checkUpdateMenu = () => {
    axios
      .post(`${serverUrl}/stores/menu-list`, {
        storeID: this.state.storeId
      })
      .then(res => {
        var thisMenu = res.data;
        this.setState({ menu: thisMenu });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  deleteMenu = e => {
    let name = e.target.id;
    axios
      .post(`${serverUrl}/stores/delete-menu`, {
        storeId: this.state.storeId,
        name: name
      })
      .then(res => {
        this.checkUpdateMenu();
        alert(`${name} 메뉴가 삭제되었습니다.`);
      })
      .catch(err => {
        alert('다시 한번 시도해주세요.');
        console.log(err.response);
      });
  };

  render() {
    const { menu } = this.state;

    if (this.state.menu === null) {
      return <div className="waitMessageMenuPage">wait a seconds</div>;
    }
    return (
      <span className="cafeMenu">
        <table className="cafeMenuSet">
          <tbody>
            <tr style={{ height: '30px' }}>
              <th>메뉴</th>
              <th>가격</th>
              {/* <th>수정버튼</th> */}
            </tr>
            {menu &&
              menu.map(item => (
                <CafeMenuEntry
                  onClick={this.deleteMenu}
                  itemName={item.name}
                  price={item.price}
                  key={item.name}
                />
              ))}
            <CafeMenuAdd checkUpdateMenu={this.checkUpdateMenu} />
          </tbody>
        </table>
      </span>
    );
  }
}

export default CafeMenuEdit;
