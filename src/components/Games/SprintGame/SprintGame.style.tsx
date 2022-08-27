import styled from 'styled-components';
// import defaultTheme from '@/styles/theme';

const SprintGameContainer = styled.div`
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const SprintGameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

export {
  SprintGameContainer, SprintGameWrapper
};
