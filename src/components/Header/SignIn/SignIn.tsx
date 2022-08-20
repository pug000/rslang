import React from 'react';
import Input from '@/Input';
import Button from '@/Button';
import CloseIcon from '@mui/icons-material/Close';
import {
  Shadow, Modal, SignInTitle, CloseBtn, iconStyles
} from './SignIn.style';

interface SignInProps {
  active: boolean;
  setActive: (arg0: boolean) => void;
  changeLoggedInState: () => void;
}

function SignInModal({ active, setActive, changeLoggedInState }: SignInProps) {
  return (
    <Shadow onClick={() => setActive(false)} active={active}>
      <Modal onClick={(e) => e.stopPropagation()} active={active}>
        <CloseBtn onClick={() => setActive(false)}>
          <CloseIcon sx={iconStyles} />
        </CloseBtn>
        <SignInTitle>Добро пожаловать!</SignInTitle>
        <form>
          <Input type="email" title="" id="login" placeholder="Введите Ваш e-mail" name="login" />
          <Input type="password" title="" id="pass" placeholder="Введите Ваш пароль" name="pass" />
          <Button id="signIn" title="Войти" callback={changeLoggedInState} />
          <Button id="signUp" title="Зарегистрироваться" callback={() => { }} />
        </form>
      </Modal>
    </Shadow>
  );
}

export default SignInModal;
