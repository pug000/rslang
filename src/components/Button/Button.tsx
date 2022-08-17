import React from 'react';
import ButtonElement from './Button.style';

interface ButtonProps {
  title: string;
}

function Button({ title }: ButtonProps) {
  return <ButtonElement type="button">{title}</ButtonElement>;
}

export default Button;
