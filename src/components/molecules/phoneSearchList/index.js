/* eslint-disable indent */
import React, { Component } from 'react';
// import Modal from '../modal/index';
import Modal from 'react-modal';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';
import axios from '../../../modules/impAxiosDefault';
import serverUrl from '../../../serverInfo';
import './index.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '230px',
    textAlign: 'center',
    paddingTop: '30px',
    paddingBottom: '30px'
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

  getCustomerInfo(e, id, phone) {
    // let deepCpCustomerInfo = JSON.parse(
    //   JSON.stringify(this.state.correctPhoneList)
    // );
    // let filteredCustomerInfo = deepCpCustomerInfo.filter(
    //   customer => customer.phone === e.target.id
    // );

    axios
      .post(`${serverUrl}/customers/get-stamps-rewards-counts`, {
        // customerID: filteredCustomerInfo[0].id,
        customerID: id,
        storeID: sessionStorage.getItem('storeId')
      })
      .then(res => {
        this.setState(
          {
            storeId: sessionStorage.getItem('storeId'),
            customerId: id,
            customerPhone: phone,
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
        <Modal isOpen={this.state.showModal} style={customStyles}>
          <div className="flexColInModal">
            <div className="flexRowInModal">
              <div className="">스탬프</div>
              <div>{this.state.stamps}개</div>
            </div>
            <div className="flexRowInModal">
              <div className="">교환권</div>
              <div>{this.state.rewards}개</div>
            </div>
          </div>
          {/* <div>스탬프 수 : {this.state.stamps} 개</div>
          <div>교환권 수 : {this.state.rewards} 개</div> */}
          <Button onClick={this.addStamps} className="buttonInModal">
            적립
          </Button>
          <Button onClick={this.handleCloseModal} className="buttonInModal">
            취소
          </Button>
        </Modal>
        <Input
          type="text"
          placeholder="휴대폰 뒷자리 검색"
          onChange={e => this.onHandleChange(e)}
          className="phoneSearchInput"
        />
        <div className="searchResult">
          {correctPhoneList && correctPhoneList.length !== 0 ? (
            correctPhoneList.map(item => (
              <div
                id={item.phone}
                onClick={e => {
                  this.getCustomerInfo(e, item.id, item.phone);
                }}
              >
                <div id={item.phone} className="searchItem">
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    <img
                      src={
                        item.name
                          ? 'icon-ggug.png'
                          : 'https://img.icons8.com/metro/26/94b7ae/gender-neutral-user.png'
                      }
                      width="16"
                      style={{ marginRight: 3 }}
                    />
                    {item.name ? `${item.name}님` : '앱 미사용 손님'}
                  </div>
                  <div style={{ fontSize: '18px' }}>{item.phone}</div>
                </div>
              </div>
            ))
          ) : (
            <tr>
              <td>검색 결과가 없습니다.</td>
            </tr>
          )}
        </div>
        <tfoot>
          <td style={{ textAlign: 'center' }}>
            <Button onClick={this.handleOpneRegisterModal}>손님 등록</Button>
          </td>
          <tr>
            <Modal isOpen={this.state.showRegisterModal} style={customStyles}>
              <label>
                핸드폰 번호
                <Input
                  onChange={this.onPhoneInputChange}
                  className="InputInModal"
                  placeholder="010-1234-1234"
                />
              </label>
              <Button onClick={this.guestRegister} className="buttonInModal">
                확인
              </Button>
              <Button
                onClick={this.handleCloseeRegisterModal}
                className="buttonInModal"
              >
                취소
              </Button>
            </Modal>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default phoneSearchList;
