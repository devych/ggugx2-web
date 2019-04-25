import React, { Component } from 'react';
import axios from 'axios';
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
      storeId: 28,
      store: null
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:3333/storeinfos')
      .then(res => {
        var thisStore = res.data.filter(
          item => item.store_id === this.state.storeId
        );
        this.setState({ store: thisStore[0] }, () =>
          console.log(this.state.store)
        );
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
        <span>
          <ImageBox imgs={this.state.store.url} />
        </span>
        <table className="infoList">
          <InfoEntrySet
            label={'가게이름'}
            placeholder={this.state.store.name}
            children={'등록'}
          />
          <InfoEntrySet
            label={'전화번호'}
            placeholder={this.state.store.phone}
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
          <InfoEntrySet
            label={'기본쿠폰개수'}
            placeholder={this.state.store.stamp}
            children={'등록'}
          />
        </table>
        <table className="stampsSet">
          <tbody>
            <tr>
              <td>
                <Select
                  option={this.state.store.menu}
                  key={this.state.store.menu}
                />
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
