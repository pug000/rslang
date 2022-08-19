import styled from 'styled-components';

const ProtectedContainer = styled.div`
  padding: 20px 25px 10px;
  min-height: 60vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ProtectedTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.h3};
`;

export {
  ProtectedContainer, ProtectedTitle
};
