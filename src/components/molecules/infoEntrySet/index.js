import React, { Component } from 'react';
import './index.css';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';
import axios from '../../../modules/impAxiosDefault';
import serverUrl from '../../../serverInfo';

class InfoEntrySet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeId: sessionStorage.getItem('storeId'),
      willUploadData: null,
      target: null
    };
  }

  onHandelChange = e => {
    this.setState({ willUploadData: e.target.value });
  };

  updateNewInfo = e => {
    this.setState({ target: e.target.id }, () => {
      const { storeId, willUploadData, target } = this.state;
      axios
        .post(`${serverUrl}/stores/update`, {
          // .post('http://localhost:3000/stores/update', {
          storeId: storeId,
          target: target,
          value: willUploadData
        })
        .then(res => {
          alert('정보가 정상적으로 변경되었습니다.');
        })
        .catch(err => {
          alert('다시 한번 시도해주세요.');
          console.log(err);
        });
    });
  };

  render() {
    const {
      id,
      label,
      className,
      placeholder,
      children,
      value,
      onClick,
      onChange,
      type
    } = this.props;
    return (
      <tr>
        <td>{label}</td>
        <td className="infoInput">
          <Input
            type={type}
            placeholder={placeholder}
            className={className}
            value={value}
            onChange={this.onHandelChange}
          />
        </td>
        <td id={id}>
          <Button id={id} children={children} onClick={this.updateNewInfo} />
        </td>
      </tr>
    );
  }
}

export default InfoEntrySet;
