import React, { Component } from 'react';
//TODO: 이부분은 전혀 정리가 되어 있지 않다. 회원가입 인풋 정리할때 다시 작성해야함
class Weekday extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { id, defaultChecked, onChange, label } = this.props;
    return (
      <label style={{ marginRight: '5px' }}>
        <input
          type="checkbox"
          id={id}
          defaultChecked={defaultChecked}
          onChange={onChange}
          style={{ verticalAlign: 'top' }}
        />
        {label}
      </label>
    );
  }
}

export default Weekday;

// = ({ mon, tues, weds, thurs, fri, sat, sun }) =>
