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
  height: 500px;
  margin-top: -8%;
  transform: scale(0.5);
  transition: ${defaultTheme.effects.transition};
`;

const SignInContainer = styled.div`
  .shadow_active {
    opacity: 0.9;
    pointer-events: all;
  }

  .modal_active {
    transform: scale(1);
  }
`;

export { SignInContainer, Shadow, Modal };
