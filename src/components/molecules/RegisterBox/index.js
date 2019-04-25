import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../../serverInfo';
import RegisterLabel from '../RegisterLabel/index';
import Button from '../../atoms/button/index';
import './index.css';
import Weekday from '../weekday';
import Input from '../../atoms/input';
import Modal from 'react-modal';

const customStyles = {
  content: {
    maxWidth: '400px',
    overflow: 'scroll',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class RegisterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showaddrSearchModal: false,
      showAddrListModal: false,
      inputLocal: null,
      localList: [],
      selectedLocal: null,
      cafeTitle: null,
      phone: null,
      password: null,
      address: null,
      openHour: null,
      closeHour: null,
      stamp: null,
      dayOff: null
    };
    this.handleOpenAddrSearchModal = this.handleOpenAddrSearchModal.bind(this);
    this.handleCloseAddrSearchModal = this.handleCloseAddrSearchModal.bind(
      this
    );
    this.handleOpenShowAddrListModal = this.handleOpenShowAddrListModal.bind(
      this
    );
    this.handleCloseShowAddrListModal = this.handleCloseShowAddrListModal.bind(
      this
    );
    this.getLocalName = this.getLocalName.bind(this);
    this.searchRealAddress = this.searchRealAddress.bind(this);
    this.setLocalNameToState = this.setLocalNameToState.bind(this);
  }

  handleOpenAddrSearchModal() {
    this.setState({ addrSearchModal: true }, () => {
      console.log('OpenAddrSearchModal');
    });
  }

  handleCloseAddrSearchModal() {
    this.setState({ addrSearchModal: false }, () => {
      console.log('CloseAddrSearchModal');
    });
  }

  handleOpenShowAddrListModal() {
    this.setState({ showAddrListModal: true }, () => {
      console.log('OpenShowAddrListModal');
    });
  }

  handleCloseShowAddrListModal() {
    this.setState({ showAddrListModal: false }, () => {
      console.log('CloseShowAddrListModal');
    });
  }

  userRegister() {
    const {
      phone,
      cafeTitle,
      password,
      address,
      inputLocal,
      selectedLocal,
      openHour,
      closeHour,
      stamp,
      dayOff
    } = this.state;
    let joinAddress = `${selectedLocal} ${address}`;

    console.log(joinAddress);

    axios
      .post(`${serverUrl}/stores/signup`, {
        phone: phone,
        storename: cafeTitle,
        password: password,
        address: joinAddress,
        openhour: openHour,
        closehour: closeHour,
        stamp: stamp,
        dayoff: dayOff
      })
      .then(res => {
        console.log(res);
        alert('회원가입이 완료되었습니다.');
        this.props.props.push('/MainPage');
      })
      .catch(err => {
        console.log(err.response);
        alert('정보를 정확히 입력해주세요.');
      });
  }

  getLocalName(e) {
    this.setState({ inputLocal: e.target.value }, () => {
      console.log(this.state.inputLocal);
    });
  }

  searchRealAddress() {
    this.handleCloseAddrSearchModal();
    let localName = this.state.inputLocal;
    this.setState({ localList: [] });
    console.log('TCL: searchRealAddress -> localName', localName);

    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${localName}&size=30`,
        {
          headers: {
            Authorization: 'KakaoAK ec8f46a785c5931b0b6694fc0eafec7f',
            accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }
      )
      .then(res => {
        console.log('res', res);
        this.setState(
          { localList: this.state.localList.concat(res.data.documents) },
          this.handleOpenShowAddrListModal
        );
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  setLocalNameToState(e) {
    console.log(e.target.id);
    this.setState({ selectedLocal: e.target.id }, () => {
      console.log(this.state.selectedLocal);
    });
    this.handleCloseShowAddrListModal();
  }

  setCafeTitleInputToState(e) {
    this.setState({ cafeTitle: e.target.value });
  }
  setPhoneInputToState(e) {
    this.setState({ phone: e.target.value });
  }
  setPasswordInputToState(e) {
    this.setState({ password: e.target.value });
  }
  setAddressInputToState(e) {
    this.setState({ address: e.target.value });
  }
  setOpenHourInputToState(e) {
    this.setState({ openHour: e.target.value });
  }
  setCloseHourInputToState(e) {
    this.setState({ closeHour: e.target.value });
  }
  setStampInputToState(e) {
    this.setState({ stamp: e.target.value });
  }
  setDayOffInputToState(e) {
    this.setState({ dayOff: e.target.value });
  }

  render() {
    const { selectedLocal } = this.state;
    return (
      <table className="registerBox">
        <caption className="bigTitle">
          <h2>회원가입</h2>
        </caption>
        <tbody className="registerLabelList">
          <RegisterLabel
            label="CafeTitle"
            className="CafeTitle"
            onChange={e => this.setCafeTitleInputToState(e)}
          />
          <RegisterLabel
            label="Phone"
            className="Phone"
            onChange={e => this.setPhoneInputToState(e)}
          />
          <RegisterLabel
            label="Password"
            className="Password"
            type="password"
            onChange={e => this.setPasswordInputToState(e)}
          />
          <RegisterLabel
            label="Address"
            className="Address"
            value={selectedLocal}
            readOnly={'readOnly'}
            subInput={
              <Input
                className="Address"
                placeholder={'상세주소를 입력해주세요.'}
                onChange={e => this.setAddressInputToState(e)}
              />
            }
            subButton={
              <Button onClick={this.handleOpenAddrSearchModal}>주소찾기</Button>
            }
          />

          <RegisterLabel
            label="OpenHour"
            className="OpenHour"
            type="time"
            onChange={e => this.setOpenHourInputToState(e)}
          />
          <RegisterLabel
            label="CloseHour"
            className="CloseHour"
            type="time"
            onChange={e => this.setCloseHourInputToState(e)}
          />
          <RegisterLabel
            label="Stamp"
            className="Stamp"
            onChange={e => this.setStampInputToState(e)}
          />
          <RegisterLabel
            label="DayOff"
            className="DayOff"
            type="date"
            onChange={e => this.setDayOffInputToState(e)}
          />
          <Weekday mon={'월'} children={'월'} />
          {/*//TODO:이부분 다시 싹다 정리해야함 <span className="registerButton"> */}
          <Button
            className="registerButton"
            onClick={() => this.userRegister()}
          >
            Submit
          </Button>
        </tbody>
        <Modal isOpen={this.state.addrSearchModal} style={customStyles}>
          <Input
            placeholder={'읍,면,동을 입력해주세요.'}
            onChange={this.getLocalName}
          />
          <Button onClick={this.searchRealAddress}>찾기</Button>
          <button onClick={this.handleCloseAddrSearchModal}>취소</button>
        </Modal>
        <Modal isOpen={this.state.showAddrListModal} style={customStyles}>
          <table>
            <caption>큰 주소</caption>
            <tbody>
              {this.state.localList && this.state.localList.length > 0 ? (
                this.state.localList.map(local => (
                  <tr>
                    <Button
                      id={local.address_name}
                      children={local.address_name}
                      onClick={e => this.setLocalNameToState(e)}
                    />
                  </tr>
                ))
              ) : (
                <tbody>
                  <tr>존재하지 않는 주소입니다.</tr>
                  <tr>주소를 정확히 입력해주세요</tr>
                </tbody>
              )}
            </tbody>
            <button onClick={this.handleCloseShowAddrListModal}>취소</button>
          </table>
        </Modal>
      </table>
    );
  }
}
export default RegisterBox;
