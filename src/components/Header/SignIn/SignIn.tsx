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
interface formProps {
  login: string;
  password: string;
}

function SignInModal({ active, setActive, changeLoggedInState }: SignInProps) {
  const inputLoginRef = React.useRef<HTMLInputElement>(null);
  const inputPasswordRef = React.useRef<HTMLInputElement>(null);
  const [form, setForm] = React.useState<formProps>()

  const handleSubmitRegistration = () => {
    if (inputLoginRef.current?.value !== undefined && inputPasswordRef.current?.value !== undefined) {
      if (inputPasswordRef.current?.value.length < 6) {
        console.log('password length not ');

      } else {
        setForm({
          ...form,
          login: inputLoginRef.current?.value,
          password: inputPasswordRef.current?.value,
        })
      }
    }
  }

  const loginForm = (form: { login: string; password: string }) => {
    return fetch('https://react-rslang-group.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((rawResponse) => console.log(rawResponse, rawResponse.status))
      .catch((err) => console.log('Error loginUser', err));
  };

  React.useEffect(() => {
    if (form?.login && form?.password) {
      loginForm({ login: form?.login, password: form.password })
    }
  }, [form])

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
          <Button id="signIn" title="Войти" callback={changeLoggedInState} />
          <Button id="signUp" title="Зарегистрироваться" callback={handleSubmitRegistration} />
        </form>
      </Modal>
    </Shadow>
  );
}

export default SignInModal;
