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
      customerId: null,
      customerPhone: null,
      stamps: null,
      rewards: null,
      stampsQuantity: 1
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.addStamps = this.addStamps.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  getCustomerInfo(e) {
    let deepCpCustomerInfo = JSON.parse(JSON.stringify(this.props.phoneList));
    let filteredCustomerInfo = deepCpCustomerInfo.filter(
      customer => customer.phone === e.target.id
    );
    console.log(filteredCustomerInfo[0].id);
    console.log(sessionStorage.getItem('storeId'));

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
        console.log(res);
        if (this.state.showModal) {
          this.handleCloseModal();
        }
      });
  }
  render() {
    const { phoneList, onChange } = this.props;

    return (
      <table className="phoneSearchBox">
        <tbody>
          <tr>
            <td colSpan="2">
              <Input
                type="text"
                placeholder="휴대폰 번호 뒤 네자리를 입력하세요"
                onChange={onChange}
              />
            </td>
          </tr>
        </tbody>
        <tbody className="phoneSearch">
          {phoneList ? (
            phoneList.map(item => (
              <tr key={item.phone}>
                <tr
                  id={item.phone}
                  onClick={e => {
                    this.getCustomerInfo(e);
                  }}
                >
                  <td id={item.phone}>{item.name}고객님</td>
                  <td id={item.phone}>{item.phone}</td>
                </tr>
                <Modal
                  isOpen={this.state.showModal}
                  style={customStyles}
                  key={item.phone}
                >
                  <div>쿠폰 개수 : {this.state.stamps}개</div>
                  <div>교환권 개수 : {this.state.rewards}개</div>
                  {/*TODO:적립요청 api 요청에서 500에러 뜸 확인 요청 */}
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
      </table>
    );
  }
}

export default phoneSearchList;
