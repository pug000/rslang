import styled from 'styled-components';

const NotFoundPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-left: -70px;
  text-align: center;

  svg {
    transform: scale(2);
    color: ${({ theme }) => theme.colors.backgroundPurple};
  }
`;

export default NotFoundPage;
