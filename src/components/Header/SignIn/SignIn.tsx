import React from 'react';
import Input from '@/Input';
import Button from '@/Button';
import CloseIcon from '@mui/icons-material/Close';
import { registerOrSingInUser, endpoints } from '@/api';
import { SignInUserData, SingUpUserData, UserData } from '@/ts/interfaces';
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
  const defaultSingUpData = { email: '', id: '' };
  const defaultSingInData = {
    content: {
      message: '',
      token: '',
      refreshToken: '',
      userId: '',
      name: '',
    }
  };
  const [userData, setUserData] = React.useState<UserData>(defaultUser);
  const [isWaitingData, setIsWaitingData] = React.useState<boolean>(false);
  const [singUpData, setSingUpData] = React.useState<SignInUserData | SingUpUserData | undefined>(defaultSingUpData);
  const [singInData, setSingInData] = React.useState<SignInUserData | SingUpUserData | undefined>(defaultSingInData);
  const [token, setToken] = React.useState<string>('');
  const [error, setError] = React.useState<number>('');
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleEvent = async (buttonId: string) => {
    setIsWaitingData(((prev) => !prev));
    switch (buttonId) {
      case 'signOut':
        setUserData({ ...defaultUser });
        await registerOrSingInUser(userData, endpoints.signin, buttonId);
        changeLoggedInState();
        setIsWaitingData(((prev) => !prev));
        break;
      case 'signIn':
        if (userData.password.length >= 8 && regex.test(userData.email)) {
          const resSignIn = await registerOrSingInUser(userData, endpoints.signin, buttonId);
          if (resSignIn.status === 200) {
            changeLoggedInState();
          }
          if (resSignIn && typeof resSignIn !== 'number') {
            setSingInData({ ...resSignIn });
            console.log('response IN', resSignIn);
            console.log('data response IN', singInData);
            console.log('data response IN token', singInData.token);
            setToken({ ...resSignIn.content.token });
            console.log(token);
          } else {
            console.log('resSignIn.status ', resSignIn);
            setError((prev) => prev = resSignIn);
          }
          setIsWaitingData(((prev) => !prev));
        }
        break;
      case 'signUp':
        if (userData.password.length >= 8 && regex.test(userData.email)) {
          const resSignUp = await registerOrSingInUser(userData, endpoints.users, buttonId);
          if (resSignUp && typeof resSignUp !== 'number') {
            setSingUpData({ ...resSignUp });
            console.log('response UP', resSignUp);
            console.log('data response UP', singUpData);
          } else {
            console.log('resSignUp.status ', resSignUp);
            setError((prev) => prev = resSignUp);
          }
          setIsWaitingData(((prev) => !prev));
        }
        break;
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
