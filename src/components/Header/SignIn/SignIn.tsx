import React from 'react';
import Input from '@/Input';
import Button from '@/Button';
import CloseIcon from '@mui/icons-material/Close';
import { registerOrSingInUser, endpoints } from '@/api';
import {
  Shadow, Modal, SignInTitle, CloseBtn, iconStyles
} from './SignIn.style';
import { UserData } from '@/ts/interfaces';

interface SignInProps {
  active: boolean;
  setActive: (arg0: boolean) => void;
  changeLoggedInState: () => void;
  isLoggedIn: boolean;
}

function SignInModal({
  active,
  setActive,
  changeLoggedInState,
  isLoggedIn
}: SignInProps) {
  const defaultUser = { email: '', password: '' };
  const [userData, setUserData] = React.useState<UserData>(defaultUser);
  const [isWaitData, setIsWaitData] = React.useState<boolean>(false);

  const handleLogin = async (user: UserData, endpoint: string, buttonId: string) => {
    const response = await registerOrSingInUser(user, endpoint);
    console.log('res.status ', response.status);
    if (response.status === 200 && buttonId === 'signIn') {
      console.log('signInUser');
      changeLoggedInState();
      setIsWaitData(false)
    } else if (response.status === 200 && buttonId === 'signOut') {
      console.log('signInUser');
      changeLoggedInState();
      console.log('userData ', userData);
    }
    setIsWaitData(false)
  };

  const handleEvent = (buttonId: string) => {
    switch (buttonId) {
      case 'signOut':
        console.log('signOutWWWW');
        setUserData({ ...defaultUser })
        console.log('userData ', userData);
        return handleLogin(userData, endpoints.signin, buttonId);
      case 'signIn':
        console.log('signInWWWWW');
        setIsWaitData(true)
        return handleLogin(userData, endpoints.signin, buttonId);
      case 'signUp':
        console.log('signUpWWWWW');
        return handleLogin(userData, endpoints.users, buttonId);
      default:
        return buttonId;
    }
  };

  return (
    <Shadow onClick={() => setActive(false)} active={active}>
      <Modal onClick={(e) => e.stopPropagation()} active={active}>
        <CloseBtn onClick={() => setActive(false)}>
          <CloseIcon sx={iconStyles} />
        </CloseBtn>
        {isWaitData ? <SignInTitle>получение данных</SignInTitle> : <SignInTitle>Добро пожаловать!</SignInTitle>}
        {/* <SignInTitle>Добро пожаловать!</SignInTitle> */}
        <form>
          <Input
            type="email"
            title=""
            id="login"
            placeholder="Введите Ваш e-mail"
            name="login"
            value={userData.email}
            onChange={({ target }) => setUserData({ ...userData, email: target.value })}
            minlength={0}
          />
          <Input
            type="password"
            title=""
            id="pass"
            placeholder="Введите Ваш пароль"
            name="pass"
            value={userData.password}
            onChange={({ target }) => setUserData({ ...userData, password: target.value })}
            minlength={6}
          />
          {isLoggedIn
            ?
            <>
              <Button id="signOut" title="Выйти" callback={handleEvent} />
              <Button id="signUp" title="Зарегистрироваться" callback={handleEvent} disabled />
            </>
            :
            <>
              <Button id="signIn" title="Войти" callback={handleEvent} />
              <Button id="signUp" title="Зарегистрироваться" callback={handleEvent} />
            </>
          }
        </form>
      </Modal>
    </Shadow>
  );
}
export default SignInModal;
