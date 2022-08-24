import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  padding-left: 0px;
  gap: 50px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  height: 100vh;
`;

export default Main;
