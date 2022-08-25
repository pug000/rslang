import React from 'react';
import Input from '@/Input';
import Button from '@/Button';
import CloseIcon from '@mui/icons-material/Close';
import { registerUser, loginUser } from '@/api';
import { LogInUserData, UserData } from '@/ts/interfaces';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import {
  Shadow, Modal, SignInTitle, CloseBtn, iconStyles, circularProgressStyle, StackStyle,
} from './SignIn.style';
import PopupMessage from './PopupMessage';
import useLocalStorage from '@/hooks/useLocalStorage';

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
  const defaultSingInData = {
    message: '',
    token: '',
    refreshToken: '',
    userId: '',
  };
  const inputLoginRef: React.MutableRefObject<HTMLInputElement | undefined> = React.useRef();
  const [userData, setUserData] = useLocalStorage('userData', defaultUser);
  // const [userData, setUserData] = React.useState<UserData>(defaultUser);
  const [isWaitingData, setIsWaitingData] = React.useState<boolean>(false);
  const [logInUserData, setLogInUserData] = useLocalStorage('logInUserData', defaultSingInData);
  // const [logInUserData, setLogInUserData] = React.useState<LogInUserData>(defaultSingInData);
  const [token, setToken] = useLocalStorage('token', '');
  // const [token, setToken] = React.useState<string>('');
  const [errShow, setErrShow] = React.useState<boolean>(false);
  const [errMessage, setErrMessage] = React.useState<string>('');
  // eslint-disable-next-line max-len, no-useless-escape
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const changeErrShow = () => setErrShow(((prev) => !prev));
  const changeWaitingData = () => setIsWaitingData(((prev) => !prev));
  const changeActiveShadow = () => setActive(false);
  const errMessageShow = (text: string) => {
    setErrMessage(text);
    changeErrShow();
    setTimeout(changeErrShow, 2000);
  };

  const createNewUser = async () => {
    if (userData.password.length >= 8 && regex.test(userData.email)) {
      changeWaitingData();
      const resCreateUser = await registerUser(userData);
      if (typeof resCreateUser !== 'number') {
        errMessageShow('Вы зарегистрированы!');
        signInUser()
      } else if (resCreateUser === 417) {
        errMessageShow('Пользователь уже зарегистрирован!');
      } else if (resCreateUser === 422) {
        errMessageShow('Неправильный e-mail или пароль!');
      }
      changeWaitingData();
    } else {
      errMessageShow('Некорректный e-mail или пароль!');
    }
  };

  const signInUser = async () => {
    if (userData.password.length >= 8 && regex.test(userData.email)) {
      changeWaitingData();
      const resCreateUser = await loginUser(userData);
      if (resCreateUser && typeof resCreateUser !== 'number') {
        setLogInUserData(resCreateUser);
        setToken(resCreateUser.token);
        errMessageShow('Вы авторизовались!');
        changeLoggedInState();
        setTimeout(changeActiveShadow, 3000);
      } else if (resCreateUser === 403) {
        errMessageShow('Неправильный e-mail или пароль!');
      } else if (resCreateUser === 404) {
        errMessageShow('Пользователь не найден');
      }
      changeWaitingData();
    } else {
      errMessageShow('Некорректный e-mail или пароль!');
    }
  };

  const signOutUser = () => {
    setUserData({ ...defaultUser });
    changeLoggedInState();
  };

  return (
    <Shadow onClick={() => setActive(false)} active={active}>
      <Modal onClick={(e) => e.stopPropagation()} active={active}>
        <CloseBtn onClick={() => setActive(false)}>
          <CloseIcon sx={iconStyles} />
        </CloseBtn>
        <SignInTitle>Добро пожаловать!</SignInTitle>
        {errShow && <PopupMessage text={errMessage} />}
        <form>
          <Input
            type="email"
            title=""
            id="login"
            placeholder="Введите Ваш e-mail"
            name="login"
            value={userData.email}
            onChange={({ target }) => { setUserData({ ...userData, email: target.value }) }}
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
                <Button id="signOut" title="Выйти" callback={signOutUser} />
                <Button id="signUp" title="Зарегистрироваться" callback={() => { }} disabled />
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
                      <Button id="signIn" title="Войти" callback={signInUser} />
                      <Button id="signUp" title="Зарегистрироваться" callback={createNewUser} />
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
