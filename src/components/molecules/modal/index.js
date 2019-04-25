import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

//TODO: 사용하지 않는 컴포넌트입니다 삭제해도 됩니다.
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
const buttonStyles = {
  zIndex: 999
};

export default class CustomerModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.showModal}
          style={customStyles}
          contentLabel="Minimal Modal Example"
        >
          <p> 솰라솰라솰라</p>
          <button onClick={this.handleCloseModal}>취소</button>
        </Modal>
      </div>
    );
  }
}
ReactDOM.render(<CustomerModal />, document.getElementById('root'));
