import React from 'react';

interface InputProps {
  titleLabel: string;
  id: string;
  placeholder: string;
  name: string;
}

function Input({
  titleLabel,
  id,
  placeholder,
  name,
}: InputProps) {
  return (
    <div>
      <label htmlFor={name}>
        <p>{titleLabel}</p>
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          name={name}
        />
      </label>
    </div>
  );
}

export default Input;
