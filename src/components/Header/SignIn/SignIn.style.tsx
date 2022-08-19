import defaultTheme from '@/styles/theme';
import styled from 'styled-components';

const Shadow = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${defaultTheme.colors.grey};
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: ${defaultTheme.effects.transition};
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center; 
`;

const Modal = styled.div`
  padding: 20px;
  border-radius: 0.6rem;
  background-color: ${defaultTheme.colors.bgWhite};
  width: 400px;
  height: 450px;
  margin-top: -8%;
  transform: scale(0.5);
  transition: ${defaultTheme.effects.transition};
  position: relative;
  
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

const shadowActive = {
  opacity: '0.9',
  'pointer-events': 'all'
};

const modalActive = {
  transform: 'scale(1)'
};

const SignInTitle = styled.h3`
  text-align: center;
  font-size: ${defaultTheme.fontSizes.h3};
  color: ${defaultTheme.colors.title};
  padding: 20px
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
    transform: 'rotate(180deg)'
  }
};

export {
  Shadow, Modal, SignInTitle, CloseBtn, iconStyles, shadowActive, modalActive
};
