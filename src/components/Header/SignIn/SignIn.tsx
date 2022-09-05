/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useContext,
  useState
} from 'react';

import HeaderContext from '@/contexts/HeaderContext';

import Input from '@/Input';
import Button from '@/Button';

import {
  registerUser,
  loginUser,
} from '@/api';
import {
  defaultToken,
  defaultUser,
  defaultUserID,
  defaultErrMessage,
  checkEmail
} from '@/utils/variables';

import ServerResponses from '@/ts/enums';
import {
  ErrMessageProps
} from '@/ts/interfaces';

import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

import PopupMessage from './PopupMessage';
import LogInIcon from '../LogInIcon';

import {
  Shadow,
  Modal,
  InputsWrapper,
  SignInTitle,
  CloseButton,
  iconStyles,
  circularProgressStyle,
  StackStyle,
  SignInWelcome,
  SignInWelcomeContainer
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
  isLoggedIn,
}: SignInProps) {
  const {
    setToken,
    setUserId,
    setRefreshToken,
  } = useContext(HeaderContext);
  const [userData, setUserData] = useState(defaultUser);
  const [isWaitingData, setIsWaitingData] = useState<boolean>(false);
  const [errShow, setErrShow] = useState<boolean>(false);

  const [errMessage, setErrMessage] = useState<ErrMessageProps>(defaultErrMessage);

  const changeErrShow = () => setErrShow(((prev) => !prev));
  const changeWaitingData = () => setIsWaitingData(((prev) => !prev));
  const changeActiveShadow = () => setActive(false);
  const errMessageShow = (text: string, activeErr: boolean) => {
    setErrMessage({ ...errMessage, text, activeErr });
    changeErrShow();
    setTimeout(changeErrShow, 3000);
  };

  const signInUser = async () => {
    if (userData.password.length >= 8 && checkEmail.test(userData.email)) {
      changeWaitingData();
      const responseSignIn = await loginUser(userData);
      if (responseSignIn && typeof responseSignIn !== 'number') {
        setToken(responseSignIn.token);
        setUserId(responseSignIn.userId);
        setRefreshToken(responseSignIn.refreshToken);
        errMessageShow('Вы авторизовались!', false);
        changeLoggedInState();
        setTimeout(changeActiveShadow, 3000);
      } else if (responseSignIn === ServerResponses.error403) {
        errMessageShow('Неправильный e-mail или пароль!', true);
      } else if (responseSignIn === ServerResponses.error404) {
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
    if (userData.password.length >= 8 && checkEmail.test(userData.email)) {
      changeWaitingData();
      const responseCreateUser = await registerUser(userData);
      if (typeof responseCreateUser !== 'number') {
        errMessageShow('Вы зарегистрированы!', false);
        signInUser();
        setTimeout(changeActiveShadow, 3000);
        setUserData({ ...defaultUser });
      } else if (responseCreateUser === ServerResponses.error417) {
        errMessageShow('Пользователь уже зарегистрирован!', true);
      } else if (responseCreateUser === ServerResponses.error422) {
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
    changeLoggedInState();
    setUserData({ ...defaultUser });
    setToken(defaultToken);
    setUserId(defaultUserID);
    setRefreshToken(defaultToken);
  };

  return (
    <Shadow onClick={() => setActive(false)} active={active}>
      <Modal onClick={(e) => e.stopPropagation()} active={active}>
        <CloseButton onClick={() => setActive(false)}>
          <CloseIcon sx={iconStyles} />
        </CloseButton>
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
              <InputsWrapper>
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
              </InputsWrapper>
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
