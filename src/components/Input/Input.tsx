import React from 'react';
import {
  TitleLabel,
  Label,
  InputField,
  InputWrapper
} from './Input.style';

interface InputProps {
  title: string;
  type: string;
  id: string;
  placeholder: string;
  name: string;
}

function Input({
  title,
  type,
  id,
  placeholder,
  name,
}: InputProps) {
  return (
    <InputWrapper>
      <Label htmlFor={name}>
        <TitleLabel>{title}</TitleLabel>
        <InputField
          type={type}
          id={id}
          placeholder={placeholder}
          name={name}
        />
      </Label>
    </InputWrapper>
  );
}

Input.Styled = InputWrapper;

export default Input;
