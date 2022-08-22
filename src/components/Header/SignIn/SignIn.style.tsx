import defaultTheme from '@/styles/theme';
import styled from 'styled-components';

interface ModalProps {
  active: boolean,
}

const Shadow = styled.div<ModalProps>`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.6);
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: ${defaultTheme.effects.transition};
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 35;

  ${({ active }) => active && `
    pointer-events: all;
    opacity: 1;
  `}
`;

const Modal = styled.div<ModalProps>`
  padding: 20px;
  border-radius: 0.6rem;
  background-color: ${defaultTheme.colors.bgWhite};
  width: 400px;
  height: 450px;
  margin-top: -8%;
  transition: ${defaultTheme.effects.transition};
  position: relative;
  transform: scale(0.9);

  ${({ active }) => active && `
    transform: scale(1);
  `}
  
  Input {
    width: 280px;
    margin-left: 40px;
  }

  Button {
    width: 280px;
    margin: 8px 40px;
  }

  Button#signUp {
    color: ${defaultTheme.colors.primaryColor};
    background-color: ${defaultTheme.colors.bgWhite};
    border: solid 0.2rem ${defaultTheme.colors.primaryColor};
  }
`;

const SignInTitle = styled.h3`
  text-align: center;
  font-size: ${defaultTheme.fontSizes.h3};
  color: ${defaultTheme.colors.title};
  padding: 20px;
`;

const CloseBtn = styled.button`
  border: none;
  background-color: transparent;
  user-select: none;
  position: absolute;
  top: -40px;
`;

const iconStyles = {
  color: `${defaultTheme.colors.primaryColor}`,
  cursor: 'pointer',
  transition: `${defaultTheme.effects.transition}`,
  '&:hover': {
    opacity: `${defaultTheme.effects.hoverOpacity}`,
    transform: 'rotate(180deg)',
  }
};

export {
  Shadow, Modal, SignInTitle, CloseBtn, iconStyles
};
