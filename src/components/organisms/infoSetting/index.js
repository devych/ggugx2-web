import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../../serverInfo';
import './index.css';
import ImageBox from '../../molecules/imageBox/index';
import InfoEntrySet from '../../molecules/infoEntrySet/index';
import Button from '../../atoms/button/index';
import Select from '../../atoms/select/index';
import Input from '../../atoms/input/index';

class InfoSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeId: sessionStorage.getItem('storeId'),
      store: null,
      menu: null
    };
  }
  componentDidMount() {
    axios
      .post(`${serverUrl}/stores/get-store-info`, {
        storeID: this.state.storeId
      })
      .then(res => {
        console.log(res);
        var thisStore = res.data;
        console.log(thisStore);
        this.setState({ store: thisStore });
      })
      .catch(err => {
        console.log(err.response);
      });

    axios
      .post(`${serverUrl}/stores/menu-list`, {
        storeID: this.state.storeId
      })
      .then(res => {
        var thisMenu = res.data;
        console.log(thisMenu);
        this.setState({ menu: thisMenu });
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  render() {
    if (this.state.store === null) {
      return <div>wait a minute</div>;
    }
    return (
      <span className="infoSetBox">
        {/* <span>{<ImageBox imgs={this.state.store.url} />}</span> */}
        <table className="infoList">
          {/* <InfoEntrySet
            label={'가게이름'}
            placeholder={this.state.store.name}
            children={'등록'}
          /> */}
          <InfoEntrySet
            label={'전화번호'}
            placeholder={this.state.store.contact}
            children={'등록'}
          />
          <InfoEntrySet
            label={'가게주소'}
            placeholder={this.state.store.address}
            children={'등록'}
          />
          <InfoEntrySet
            label={'오픈시간'}
            placeholder={this.state.store.openhour}
            children={'등록'}
          />
          <InfoEntrySet
            label={'종료시간'}
            placeholder={this.state.store.closehour}
            children={'등록'}
          />
          <InfoEntrySet
            label={'휴무일'}
            placeholder={this.state.store.dayoff}
            children={'등록'}
          />
          {/* <InfoEntrySet
            label={'기본쿠폰개수'}
            placeholder={this.state.store.stamp}
            children={'등록'}
          /> */}
        </table>
        <table className="stampsSet">
          <tbody>
            <tr>
              <td>
                <Select option={this.state.menu} key={this.state.menu} />
              </td>
              <td>
                <Input placeholder={'쿠폰갯수'} />
              </td>
              <td>
                <Button children={'등록'} />
              </td>
            </tr>
          </tbody>
        </table>
      </span>
    );
  }
}

export default InfoSetting;
