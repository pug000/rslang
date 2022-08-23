import React from 'react';
import Input from '@/Input';
import Button from '@/Button';
import CloseIcon from '@mui/icons-material/Close';
import { registerOrSingInUser, endpoints } from '@/api';
import { UserData } from '@/ts/interfaces';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import {
  Shadow, Modal, SignInTitle, CloseBtn, iconStyles, circularProgressStyle, StackStyle
} from './SignIn.style';

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
  const [isWaitingData, setIsWaitingData] = React.useState<boolean>(false);

  const handleLogin = async (user: UserData, endpoint: string, buttonId: string) => {
    setIsWaitingData(((prev) => !prev));
    console.log('here start true', isWaitingData);

    const response = await registerOrSingInUser(user, endpoint);
    console.log('res.status ', response.status);
    if (response.status === 200 && buttonId === 'signIn') {
      console.log('signInUser');
      changeLoggedInState();
    } else if (response.status === 200 && buttonId === 'signOut') {
      console.log('signInUser');
      changeLoggedInState();
      console.log('userData ', userData);
    } else if (response.status === 403) {
      console.log('');
    }
    console.log('here end true ', isWaitingData);
    setIsWaitingData(((prev) => !prev));
  };

  const handleEvent = (buttonId: string) => {
    switch (buttonId) {
      case 'signOut':
        setUserData({ ...defaultUser });
        return handleLogin(userData, endpoints.signin, buttonId);
      case 'signIn':
        return handleLogin(userData, endpoints.signin, buttonId);
      case 'signUp':
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
        <SignInTitle>Добро пожаловать!</SignInTitle>
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
            ? (
              <>
                <Button id="signOut" title="Выйти" callback={handleEvent} />
                <Button id="signUp" title="Зарегистрироваться" callback={handleEvent} disabled />
              </>
            )
            : (
              <div>
                {isWaitingData
                  ? (
                    <Stack sx={StackStyle}>
                      <CircularProgress sx={circularProgressStyle} />
                    </Stack>
                  )

                  : (
                    <>
                      <Button id="signIn" title="Войти" callback={handleEvent} />
                      <Button id="signUp" title="Зарегистрироваться" callback={handleEvent} />
                    </>
                  )}
              </div>
            )}
        </form>
      </Modal>
    </Shadow>
  );
}
export default SignInModal;
