import React, { Component } from 'react';
import axios from 'axios';
import mapConfig from '../../../config/config';
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

const week = [
  { kor: '월', eng: 'mon' },
  { kor: '화', eng: 'tues' },
  { kor: '수', eng: 'wed' },
  { kor: '목', eng: 'thurs' },
  { kor: '금', eng: 'fri' },
  { kor: '토', eng: 'sat' },
  { kor: '일', eng: 'sun' }
];

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
      lattitude: null,
      longitude: null,
      openHour: null,
      closeHour: null,
      stamp: null,
      dayOff: [],
      mon: false,
      tues: false,
      wed: false,
      thurs: false,
      fri: false,
      sat: false,
      sun: false
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
    this.handleChangeChk = this.handleChangeChk.bind(this);
  }

  handleOpenAddrSearchModal() {
    this.setState({ addrSearchModal: true });
  }

  handleCloseAddrSearchModal() {
    this.setState({ addrSearchModal: false });
  }

  handleOpenShowAddrListModal() {
    this.setState({ showAddrListModal: true });
  }

  handleCloseShowAddrListModal() {
    this.setState({ showAddrListModal: false });
  }

  userRegister() {
    const {
      phone,
      cafeTitle,
      password,
      address,
      selectedLocal,
      lattitude,
      longitude,
      openHour,
      closeHour,
      stamp,
      dayOff
    } = this.state;

    let joinAddress = `${selectedLocal} ${address ? address : ''}`;

    axios
      .post(`${serverUrl}/stores/signup`, {
        phone: phone,
        storename: cafeTitle,
        password: password,
        address: joinAddress,
        lattitude: lattitude,
        longitude: longitude,
        openhour: openHour,
        closehour: closeHour,
        stamp: stamp,
        dayoff: dayOff.join()
      })
      .then(res => {
        console.log(res);
        alert('회원가입이 완료되었습니다.');
        this.props.props.push('/');
      })
      .catch(err => {
        console.log(err.response);
        alert('정보를 정확히 입력해주세요.');
      });
  }

  getLocalName(e) {
    this.setState({ inputLocal: e.target.value });
  }

  async searchRealAddress() {
    this.handleCloseAddrSearchModal();
    let localName = this.state.inputLocal;
    this.setState({ localList: [] });

    try {
      let res = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${localName}&size=30`,
        mapConfig
      );

      console.log('res', res);
      this.setState(
        { localList: this.state.localList.concat(res.data.documents) },
        this.handleOpenShowAddrListModal
      );
    } catch (err) {
      console.log(err.response);
    }
  }

  setLocalNameToState(e) {
    let getXYPoint = this.state.localList.filter(
      local => local.address_name === e.target.id
    );
    this.setState({
      selectedLocal: e.target.id,
      lattitude: getXYPoint[0].y,
      longitude: getXYPoint[0].x
    });
    this.handleCloseShowAddrListModal();
  }

  handleChangeChk(e) {
    let onDay = [];
    this.setState(
      { [e.target.id]: !this.state[e.target.id], dayOff: [] },
      () => {
        const { mon, tues, wed, thurs, fri, sat, sun } = this.state;
        const day = [mon, tues, wed, thurs, fri, sat, sun];
        for (let key in day) {
          if (day[key] === true) {
            onDay.push(week[key].kor);
          }
        }
        this.setState({ dayOff: this.state.dayOff.concat(onDay) });
      }
    );
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
        <caption className="bigTitle">회원가입</caption>
        <tbody className="registerLabelList">
          <RegisterLabel
            label="매장 이름"
            className="CafeTitle"
            placeholder="매장 이름을 입력해주세요"
            onChange={e => this.setCafeTitleInputToState(e)}
          />
          <RegisterLabel
            label="전화번호"
            className="Phone"
            placeholder="02-123-1234"
            onChange={e => this.setPhoneInputToState(e)}
          />
          <RegisterLabel
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            className="Password"
            type="password"
            onChange={e => this.setPasswordInputToState(e)}
          />
          {/* 비밀번호 확인 기능 있으면 좋은데.. */}
          <RegisterLabel
            label="매장 주소"
            className="Address"
            value={selectedLocal}
            readOnly={'readOnly'}
            placeholder={'주소찾기 버튼을 클릭하세요'}
            subInput={
              <Input
                className="AddressInput"
                placeholder={'상세주소를 입력해주세요.'}
                onChange={e => this.setAddressInputToState(e)}
              />
            }
            subButton={
              <Button
                onClick={this.handleOpenAddrSearchModal}
                className="findAddressButton"
              >
                주소찾기
              </Button>
            }
          />

          <RegisterLabel
            label="오픈 시간"
            className="OpenHour"
            type="time"
            onChange={e => this.setOpenHourInputToState(e)}
          />
          <RegisterLabel
            label="마감 시간"
            className="CloseHour"
            type="time"
            onChange={e => this.setCloseHourInputToState(e)}
          />
          <RegisterLabel
            label="스탬프 수"
            className="Stamp"
            placeholder="교환에 필요한 스탬프 수를 입력해주세요"
            onChange={e => this.setStampInputToState(e)}
          />
          <tr
            className="registerLabel"
            style={{ height: '20px', paddingTop: '8px' }}
          >
            <th className="label">휴무일</th>
            <td className="registerInput">
              {week.map(day => (
                <Weekday
                  label={day.kor}
                  id={day.eng}
                  defaultChecked={this.state[day.eng]}
                  onChange={e => this.handleChangeChk(e)}
                />
              ))}
            </td>
          </tr>
          {/* <tr colSpan="2" className="registerLabel">
            <th>
              <Button
                className="registerButton"
                onClick={() => this.userRegister()}
              >
                가입하기
              </Button>
            </th>
          </tr> */}
        </tbody>
        <Button className="registerButton" onClick={() => this.userRegister()}>
          가입하기
        </Button>
        <Modal isOpen={this.state.addrSearchModal} style={customStyles}>
          <Input
            placeholder={'읍,면,동 또는 도로명 주소를 입력해주세요.'}
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
                      onClick={this.setLocalNameToState.bind(this)}
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
