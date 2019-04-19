import React from 'react';
import './index.css';
import Input from '../../atoms/input/index';
import Button from '../../atoms/button/index';

const InfoEntrySet = ({ label, className, placeholder, children }) => {
  return (
    <tbody>
      <tr>
        <td>{label}</td>
        <td className="infoInput">
          <Input placeholder={placeholder} className={className} />
        </td>
        <td>
          <Button children={children} />
        </td>
      </tr>
    </tbody>
  );
};

export default InfoEntrySet;
