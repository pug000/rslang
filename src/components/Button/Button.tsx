import React from 'react';
import ButtonElement from './Button.style';

interface ButtonProps {
  title: string;
  callback: () => void;
  disabled?: boolean;
}

function Button({ title, disabled, callback }: ButtonProps) {
  const handlerClickButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    callback();
  };

  return (
    <ButtonElement
      type="button"
      disabled={disabled}
      onClick={handlerClickButton}
    >
      {title}
    </ButtonElement>
  );
}

Button.defaultProps = {
  disabled: false,
};

export default Button;
