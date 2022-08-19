import React from 'react';
import ButtonElement from './Button.style';

interface ButtonProps {
  title: string;
  id: string;
  callback: () => void;
  disabled?: boolean;
}

function Button({
  title, id, disabled, callback
}: ButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlerClickButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    callback();
  };

  return (
    <ButtonElement
      type="button"
      id={id}
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
