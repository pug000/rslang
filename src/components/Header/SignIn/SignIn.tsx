import React from 'react';
import Input from '@/Input';
import Button from '@/Button';
import CloseIcon from '@mui/icons-material/Close';
import {
  Shadow, Modal, SignInTitle, CloseBtn, iconStyles
} from './SignIn.style';
import { registerUser, signInUser } from '@/api';

interface SignInProps {
  active: boolean;
  setActive: (arg0: boolean) => void;
  changeLoggedInState: () => void;
  isLoggedIn: boolean;
}
interface userDataProps {
  email: string;
  password: string;
}

function SignInModal({
  active,
  setActive,
  changeLoggedInState,
  isLoggedIn }: SignInProps) {
  const inputLoginRef = React.useRef<HTMLInputElement>(null);
  const inputPasswordRef = React.useRef<HTMLInputElement>(null);
  const [userData, setUserData] = React.useState<userDataProps>()

  const handleRegister = async () => {
    if (inputLoginRef.current?.value !== undefined && inputPasswordRef.current?.value !== undefined) {
      if (inputPasswordRef.current?.value.length >= 8) {
        setUserData({
          ...userData,
          email: inputLoginRef.current?.value,
          password: inputPasswordRef.current?.value,
        })
      }
      if (userData?.email && userData?.password) {
        const res = await registerUser({ email: userData.email, password: userData.password })
        console.log('registerUser');
        console.log('res.status ', res.status);
      }
    }
  }

  const handleSignIn = async () => {
    if (inputLoginRef.current?.value !== undefined && inputPasswordRef.current?.value !== undefined) {
      if (inputPasswordRef.current?.value.length >= 8) {
        setUserData({
          ...userData,
          email: inputLoginRef.current?.value,
          password: inputPasswordRef.current?.value,
        })
      }
      if (userData?.email && userData?.password) {
        const res = await signInUser({ email: userData.email, password: userData.password })
        console.log('signInUser');
        console.log('res.status ', res.status);
        if (res.status === 200) {
          changeLoggedInState()
        }
      }
    }
  }

  const handleSignOut = async () => {
    if (inputLoginRef.current?.value !== undefined && inputPasswordRef.current?.value !== undefined) {
      if (inputPasswordRef.current?.value.length >= 8) {
        setUserData({
          ...userData,
          email: '',
          password: '',
        })
      }
      if (userData?.email && userData?.password) {
        const res = await signInUser({ email: userData.email, password: userData.password })
        console.log('signInUser');
        console.log('res.status ', res.status);
        changeLoggedInState()
      }
    }
  }

  // React.useEffect(() => {
  //   if (userData?.email && userData?.password) {
  //     registerUser({ email: userData.email, password: userData.password })
  //     console.log('inEffect');
  //   }
  // }, [userData])

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
            innerRef={inputLoginRef} />
          <Input
            type="password"
            title=""
            id="pass"
            placeholder="Введите Ваш пароль"
            name="pass"
            minlength={6}
            innerRef={inputPasswordRef} />
          {isLoggedIn
            ? <Button id="signOut" title="Выйти" callback={handleSignOut} />
            : <Button id="signIn" title="Войти" callback={handleSignIn} />}
          <Button id="signUp" title="Зарегистрироваться" callback={handleRegister} />
        </form>
      </Modal>
    </Shadow>
  );
}
export default SignInModal;
