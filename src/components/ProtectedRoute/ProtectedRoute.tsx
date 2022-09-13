import React from 'react';

import {
  Container,
  ProtectedTitle
} from './ProtectedRoute.style';

interface ProtectedProps {
  conditionValue: boolean | null,
  children: JSX.Element,
}

function ProtectedRoute({ conditionValue, children }: ProtectedProps) {
  if (!conditionValue) {
    return (
      <Container>
        <ProtectedTitle>
          Вам необходимо зайти под вашей учетной записью или зарегистрироваться
        </ProtectedTitle>
      </Container>
    );
  }
  return children;
}

export default ProtectedRoute;
