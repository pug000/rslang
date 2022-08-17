import React from 'react';
import ButtonElement from './Button.style';

export interface ButtonProps {
  title: string;
  disabled?: boolean;
}

function Button({ title, disabled }: ButtonProps) {
  return <ButtonElement type="button" disabled={disabled}>{title}</ButtonElement>;
}

Button.defaultProps = {
  disabled: false,
};

export default Button;
