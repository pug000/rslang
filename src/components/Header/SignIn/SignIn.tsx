import React from 'react';
import Input from '@/Input';
import Button from '@/Button';
import CloseIcon from '@mui/icons-material/Close';
import {
  Shadow, Modal, SignInTitle, CloseBtn, iconStyles, shadowActive, modalActive
} from './SignIn.style';

interface SignInProps {
  active: boolean;
  setActive: (arg0: boolean) => void;
  handleLoggedChange: () => void;
}

function SignInModal({ active, setActive, handleLoggedChange }: SignInProps) {
  return (
    <Shadow onClick={() => setActive(false)} style={active ? shadowActive : undefined}>
      <Modal onClick={(e) => e.stopPropagation()} style={active ? modalActive : undefined}>
        <CloseBtn onClick={() => setActive(false)}>
          <CloseIcon sx={iconStyles} />
        </CloseBtn>
        <SignInTitle>Добро пожаловать!</SignInTitle>
        <form>
          <Input type="email" title="" id="login" placeholder="Введите Ваш e-mail" name="login" />
          <Input type="password" title="" id="pass" placeholder="Введите Ваш пароль" name="pass" />
          <Button id="signIn" title="Войти" callback={handleLoggedChange} />
          <Button id="signUp" title="Зарегистрироваться" callback={() => { }} />
        </form>
      </Modal>
    </Shadow>
  );
}

export default SignInModal;
