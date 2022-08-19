import React from 'react';
import { SignInContainer, Shadow, Modal } from './SignIn.style';

interface SignInProps {
  active: boolean;
  setActive: (arg0: boolean) => void;
}

function SignInModal({ active, setActive }: SignInProps) {
  return (
    <SignInContainer>
      <Shadow onClick={() => setActive(false)} className={active ? 'shadow_active' : ''}>
        <Modal onClick={(e) => e.stopPropagation} className={active ? 'modal_active' : ''} />
      </Shadow>
    </SignInContainer>
  );
}

export default SignInModal;
