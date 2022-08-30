import React from 'react';
import ButtonElement from './Button.style';

interface ButtonProps {
  title: string;
  id: string;
  callback: (id: string) => void;
  color?: string;
  disabled?: boolean;
}

function Button({
  title,
  id,
  disabled,
  callback,
  color,
}: ButtonProps) {
  return (
    <ButtonElement
      type="button"
      id={id}
      disabled={disabled}
      onClick={() => callback(id)}
      $color={color}
    >
      {title}
    </ButtonElement>
  );
}

Button.defaultProps = {
  disabled: false,
  color: '',
};

export default Button;
