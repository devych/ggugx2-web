import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import axios from '../../../modules/impAxiosDefault';
import 'filepond/dist/filepond.min.css';
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
      imgUrl: null,
      menu: null,
      setStoreInfo: null
    };
  }
  componentDidMount() {
    axios
      .post(`${serverUrl}/stores/get-store-info`, {
        storeID: this.state.storeId
      })
      .then(res => {
        var thisStore = res.data;
        console.log(thisStore);
        this.setState({ store: thisStore, imgUrl: thisStore.imgUrl }, () => {
          console.log(this.state.imgUrl);
        });
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
        <span>
          {this.state.imgUrl ? <ImageBox imgs={this.state.imgUrl} /> : null}
        </span>
        <table className="infoList">
          <tbody>
            {/* <InfoEntrySet
            label={'가게이름'}
            placeholder={this.state.store.name}
            children={'등록'}
          /> */}
            <tr>
              <td>사진업로드</td>
              <td>
                <FilePond
                  allowMultiple={false}
                  server={{
                    url: `${serverUrl}`,
                    process: {
                      url: '/stores/upload-image',
                      method: 'POST',
                      withCredentials: false,
                      headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                          'token'
                        )}`
                      },
                      timeout: 7000,
                      ondata: formData => {
                        formData.append('storeId', this.state.storeId);
                        formData.append('isMain', true);
                        return formData;
                      },
                      onload: res => {
                        console.log(res);
                      }
                    }
                  }}
                />
              </td>
            </tr>
            <InfoEntrySet
              id="phone"
              label={'전화번호'}
              placeholder={this.state.store.contact}
              children={'수정'}
            />
            <InfoEntrySet
              id="address"
              label={'가게주소'}
              placeholder={this.state.store.address}
              children={'수정'}
            />
            <InfoEntrySet
              id="openhour"
              type="time"
              label={'오픈시간'}
              placeholder={this.state.store.openhour}
              children={'수정'}
            />
            <InfoEntrySet
              id="closehour"
              type="time"
              label={'종료시간'}
              placeholder={this.state.store.closehour}
              children={'수정'}
            />
            <InfoEntrySet
              id="dayoff"
              label={'휴무일'}
              placeholder={this.state.store.dayoff}
              children={'수정'}
            />
            {/* <InfoEntrySet
            label={'기본쿠폰개수'}
            placeholder={this.state.store.stamp}
            children={'등록'}
          /> */}
          </tbody>
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
