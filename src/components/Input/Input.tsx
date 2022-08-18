import React from 'react';
import {
  TitleLabel,
  Label,
  InputField,
  InputWrapper
} from './Input.style';

interface InputProps {
  titleLabel: string;
  id: string;
  placeholder: string;
  name: string;
}

function Input({
  titleLabel,
  id,
  placeholder,
  name,
}: InputProps) {
  return (
    <InputWrapper>
      <Label htmlFor={name}>
        <TitleLabel>{titleLabel}</TitleLabel>
        <InputField
          type="text"
          id={id}
          placeholder={placeholder}
          name={name}
        />
      </Label>
    </InputWrapper>
  );
}

export default Input;
