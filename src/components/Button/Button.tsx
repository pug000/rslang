import React from 'react';
import ButtonElement from './Button.style';

export interface ButtonProps {
  title: string;
  disabled?: boolean;
}

function Button({ title, disabled }: ButtonProps) {
  const handlerClickButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.target);
  };

  return <ButtonElement type="button" disabled={disabled} onClick={handlerClickButton}>{title}</ButtonElement>;
}

Button.defaultProps = {
  disabled: false,
};

export default Button;
