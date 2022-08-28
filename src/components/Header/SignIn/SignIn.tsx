import React, { useState } from 'react';
import Input from '@/Input';
import Button from '@/Button';
import CloseIcon from '@mui/icons-material/Close';
import { registerUser, loginUser } from '@/api';
import { LogInUserData } from '@/ts/interfaces';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import useLocalStorage from '@/hooks/useLocalStorage';
import StatusError from '@/ts/enums';
import { regex } from '@/utils/variables';
import {
  Shadow, Modal, SignInTitle, CloseBtn, iconStyles, circularProgressStyle, StackStyle,
  SignInWelcome, SignInWelcomeContainer
} from './SignIn.style';
import PopupMessage from './PopupMessage';
import LogInIcon from '../LogInIcon';

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
  const dafaultToken = '';
  const dafaultUserID = '';
  const [userData, setUserData] = useState(defaultUser);
  const [isWaitingData, setIsWaitingData] = useState<boolean>(false);
  const [logInUserData, setLogInUserData] = useState<LogInUserData>(defaultSingInData);
  const [token, setToken] = useLocalStorage('token', dafaultToken);
  const [userId, setUserId] = useLocalStorage('userId', dafaultUserID);
  const [errShow, setErrShow] = useState<boolean>(false);
  interface ErrMessageProps {
    text: string;
    activeErr: boolean;
  }

  const dafaultErrMessage = {
    text: '',
    activeErr: false,
  }

  const [errMessage, setErrMessage] = useState<ErrMessageProps>(dafaultErrMessage);

  const changeErrShow = () => setErrShow(((prev) => !prev));
  const changeWaitingData = () => setIsWaitingData(((prev) => !prev));
  const changeActiveShadow = () => setActive(false);
  const errMessageShow = (text: string, activeErr: boolean) => {
    setErrMessage({ ...errMessage, text: text, activeErr: activeErr });
    changeErrShow();
    setTimeout(changeErrShow, 3000);
  };

  const signInUser = async () => {
    if (userData.password.length >= 8 && regex.test(userData.email)) {
      changeWaitingData();
      const resCreateUser = await loginUser(userData);
      if (resCreateUser && typeof resCreateUser !== 'number') {
        setLogInUserData(resCreateUser);
        setToken(resCreateUser.token);
        setUserId(resCreateUser.userId);
        errMessageShow('Вы авторизовались!', false);
        changeLoggedInState();
        setTimeout(changeActiveShadow, 3000);
      } else if (resCreateUser === StatusError.error403) {
        errMessageShow('Неправильный e-mail или пароль!', true);
      } else if (resCreateUser === StatusError.error404) {
        errMessageShow('Пользователь не найден. Зарегистрируйтесь.', true);
      }
      changeWaitingData();
    } else if (userData.password.length < 8) {
      errMessageShow('Некорректный пароль! Минимум 8 символов.', true);
    } else {
      errMessageShow('Некорректный e-mail!', true);
    }
  };

  const createNewUser = async () => {
    if (userData.password.length >= 8 && regex.test(userData.email)) {
      changeWaitingData();
      const resCreateUser = await registerUser(userData);
      if (typeof resCreateUser !== 'number') {
        errMessageShow('Вы зарегистрированы! Авторизуйтесь.', false);
        setUserData({ ...defaultUser });
      } else if (resCreateUser === StatusError.error417) {
        errMessageShow('Пользователь уже зарегистрирован!', true);
      } else if (resCreateUser === StatusError.error422) {
        errMessageShow('Неправильный e-mail или пароль!', true);
      }
      changeWaitingData();
    } else if (userData.password.length < 8) {
      errMessageShow('Некорректный пароль! Минимум 8 символов.', true);
    } else {
      errMessageShow('Некорректный e-mail!', true);
    }
  };

  const signOutUser = () => {
    errMessageShow('До новых встреч!', false);
    setUserData({ ...defaultUser });
    setToken(dafaultToken);
    setUserId(dafaultUserID);
    changeLoggedInState();
  };

  return (
    <Shadow onClick={() => setActive(false)} active={active}>
      <Modal onClick={(e) => e.stopPropagation()} active={active}>
        <CloseBtn onClick={() => setActive(false)}>
          <CloseIcon sx={iconStyles} />
        </CloseBtn>
        {isLoggedIn
          ? <SignInTitle>Вы авторизованы!</SignInTitle>
          : <SignInTitle>Добро пожаловать!</SignInTitle>}
        {errShow && <PopupMessage statusErr={errMessage.activeErr} text={errMessage.text} />}
        <form>
          {isLoggedIn
            ? (
              <SignInWelcomeContainer>
                <SignInWelcome>Весёлого обучения!</SignInWelcome>
                <LogInIcon />
              </SignInWelcomeContainer>
            )
            : (
              <>
                <Input
                  type="email"
                  title=""
                  id="login"
                  placeholder="Введите Ваш e-mail"
                  name="login"
                  value={userData.email}
                  onChange={({ target }) => { setUserData({ ...userData, email: target.value }); }}
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
                  minlength={8}
                />
              </>
            )}
          {isLoggedIn
            ? (
              <>
                <Button id="signOut" title="Выйти" callback={signOutUser} />
                <Button id="signCancel" title="Отмена" callback={() => setActive(false)} />
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
