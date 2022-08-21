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
  innerRef: React.RefObject<HTMLInputElement>;
  minlength?: number;
}

function Input({
  title,
  type,
  id,
  placeholder,
  name,
  innerRef,
  minlength = 0
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
          ref={innerRef}
          minLength={minlength}
        />
      </Label>
    </InputWrapper>
  );
}

Input.Styled = InputWrapper;

export default Input;
