import React from 'react';
import Input from '@/Input';
import Button from '@/Button';
import CloseIcon from '@mui/icons-material/Close';
import {
  SignInContainer, Shadow, Modal, SignInTitle, CloseBtn, iconStyles
} from './SignIn.style';

interface SignInProps {
  active: boolean;
  setActive: (arg0: boolean) => void;
}

function SignInModal({ active, setActive }: SignInProps) {
  return (
    <SignInContainer>
      <Shadow onClick={() => setActive(false)} className={active ? 'shadow_active' : ''}>
        <Modal onClick={(e) => e.stopPropagation()} className={active ? 'modal_active' : ''}>
          <CloseBtn onClick={() => setActive(false)}>
            <CloseIcon sx={iconStyles} />
          </CloseBtn>
          <SignInTitle>Добро пожаловать!</SignInTitle>
          <Input type="email" title="" id="login" placeholder="Введите Ваш e-mail" name="login" />
          <Input type="password" title="" id="pass" placeholder="Введите Ваш пароль" name="pass" />
          <Button id="signIn" title="Войти" callback={() => { }} />
          <Button id="signUp" title="Зарегистрироваться" callback={() => { }} />
        </Modal>
      </Shadow>
    </SignInContainer>
  );
}

export default SignInModal;
