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
  value: string;
  onChange: (target: React.ChangeEvent<HTMLInputElement>) => void;
  minlength: number;
}

function Input({
  title,
  type,
  id,
  placeholder,
  name,
  value,
  onChange,
  minlength,
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
          minLength={minlength}
          value={value}
          onChange={onChange}
        />
      </Label>
    </InputWrapper>
  );
}

Input.Styled = InputWrapper;

export default Input;
