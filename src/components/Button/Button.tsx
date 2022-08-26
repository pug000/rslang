import React from 'react';
import ButtonElement from './Button.style';

interface ButtonProps {
  title: string;
  id: string;
  callback: (id: string) => void;
  disabled?: boolean;
}

function Button({
  title, id, disabled, callback
}: ButtonProps) {
  return (
    <ButtonElement
      type="button"
      id={id}
      disabled={disabled}
      onClick={() => callback(id)}
    >
      {title}
    </ButtonElement>
  );
}

Button.defaultProps = {
  disabled: false,
};

export default Button;
