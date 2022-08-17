import React from 'react';

interface ButtonProps {
  title: string;
}
function Button({ title }: ButtonProps) {
  return <button type="button">{title}</button>;
}

export default Button;
