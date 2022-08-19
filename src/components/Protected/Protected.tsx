import React from 'react';
import { ProtectedContainer, ProtectedTitle } from './Protected.style';

interface ProtectedProps {
  conditionValue: boolean | null,
  children: JSX.Element,
}

function Protected({ conditionValue, children }: ProtectedProps) {
  if (!conditionValue) {
    return (
      <ProtectedContainer>
        <ProtectedTitle>
          Вам необходимо зайти под вашей учетной записью или зарегистрироваться
        </ProtectedTitle>
      </ProtectedContainer>
    );
  }
  return children;
}

export default Protected;
