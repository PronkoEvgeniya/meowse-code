import React from 'react';
import { InputLoginProps } from '../../types/interfaces';

const Input = (props: InputLoginProps) => {
  return (
    <input
      onChange={(event) => props.setValue(event.target.value)}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
