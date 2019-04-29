/* eslint-disable indent */
import React, { Component } from 'react';
// import Modal from '../modal/index';
import Modal from 'react-modal';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';
import axios from 'axios';
import serverUrl from '../../../serverInfo';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class phoneSearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showRegisterModal: false,
      customerId: null,
      customerPhone: null,
      stamps: null,
      rewards: null,
      stampsQuantity: 1,
      phone: null,
      data: null,
      correctPhoneList: null,
      registerPhone: null
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.addStamps = this.addStamps.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleOpneRegisterModal = () => {
    this.setState({ showRegisterModal: true });
  };

  handleCloseeRegisterModal = () => {
    this.setState({ showRegisterModal: false });
  };

  onHandleChange(e) {
    this.setState({ phone: e.target.value }, () => {
      if (this.state.phone.length > 3) {
        axios
          // .post('http://localhost:3000/customers/getAll', {
          //   phone: this.state.phone
          // })
          //TODO:서버로 올릴때 아래 url로 변경하여 올려야함
          .post(`${serverUrl}/customers/getAll`, {
            phone: this.state.phone
          })
          .then(res => {
            this.setState({ correctPhoneList: res.data });
          })
          .catch(err => {
            console.log(err.response);
          });
      } else {
        this.setState({ correctPhoneList: null });
      }
    });
  }

  onPhoneInputChange = e => {
    this.setState({ registerPhone: e.target.value });
  };

  guestRegister = () => {
    axios
      // .post('http://localhost:3000/customers/signup', {
      //   phone: this.state.registerPhone
      // })
      .post(`${serverUrl}/customers/signup`, {
        phone: this.state.registerPhone
      })
      .then(res => {
        alert('가입이 완료되었습니다.');
        this.handleCloseeRegisterModal();
      })
      .catch(err => {
        alert('이미 가입한 회원입니다.');
        console.log(err.response);
      });
  };

  getCustomerInfo(e) {
    let deepCpCustomerInfo = JSON.parse(
      JSON.stringify(this.state.correctPhoneList)
    );
    let filteredCustomerInfo = deepCpCustomerInfo.filter(
      customer => customer.phone === e.target.id
    );

    axios
      .post(`${serverUrl}/customers/get-stamps-rewards-counts`, {
        customerID: filteredCustomerInfo[0].id,
        storeID: sessionStorage.getItem('storeId')
      })
      .then(res => {
        this.setState(
          {
            storeId: sessionStorage.getItem('storeId'),
            customerId: filteredCustomerInfo[0].id,
            customerPhone: filteredCustomerInfo[0].phone,
            stamps: res.data.stamps,
            rewards: res.data.rewards
          },
          this.handleOpenModal
        );
        return res;
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  addStamps() {
    axios
      .post(`${serverUrl}/stamps/add`, {
        customerID: this.state.customerId,
        storeID: this.state.storeId
      })
      .then(res => {
        if (this.state.showModal) {
          this.handleCloseModal();
        }
      })
      .catch(err => console.log(err.response));
  }
  render() {
    const { correctPhoneList } = this.state;
    return (
      <table className="phoneSearchBox">
        <tbody>
          <tr>
            <td colSpan="2">
              <Input
                type="text"
                placeholder="휴대폰 번호 뒤 네자리를 입력하세요"
                onChange={e => this.onHandleChange(e)}
              />
            </td>
          </tr>
        </tbody>
        <tbody className="phoneSearch">
          {correctPhoneList && correctPhoneList.length !== 0 ? (
            correctPhoneList.map(item => (
              <tr key={item.phone}>
                <tr
                  id={item.phone}
                  onClick={e => {
                    this.getCustomerInfo(e);
                  }}
                >
                  <td id={item.phone}>
                    {item.name ? `${item.name} 고객님` : '비회원 고객님'}
                  </td>
                  <td id={item.phone}>{item.phone}</td>
                </tr>
                <Modal
                  isOpen={this.state.showModal}
                  style={customStyles}
                  key={item.phone}
                >
                  <div>쿠폰 개수 : {this.state.stamps} 개</div>
                  <div>교환권 개수 : {this.state.rewards} 개</div>
                  <Button onClick={this.addStamps}>적립</Button>
                  <button onClick={this.handleCloseModal}>취소</button>
                </Modal>
              </tr>
            ))
          ) : (
            <tr>
              <td>검색 결과가 없습니다.</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <td>
            <Button onClick={this.handleOpneRegisterModal}>가입시키기</Button>
          </td>
          <tr>
            <Modal isOpen={this.state.showRegisterModal} style={customStyles}>
              <div>테스트중</div>
              <label>
                핸드폰 번호 : <Input onChange={this.onPhoneInputChange} />
              </label>
              <Button onClick={this.guestRegister}>확인</Button>
              <Button onClick={this.handleCloseeRegisterModal}>취소</Button>
            </Modal>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default phoneSearchList;
