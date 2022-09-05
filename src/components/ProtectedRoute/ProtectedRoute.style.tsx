import styled from 'styled-components';

const Container = styled.div`
  padding: 20px 25px 10px;
  margin: 0 auto;
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ProtectedTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.h3};

  @media (max-width: 480px) {
    font-size: ${(props) => props.theme.fontSizes.h4};
  }

  @media (max-width: 350px) {
    font-size: ${(props) => props.theme.fontSizes.h5};
  }
`;

export {
  Container,
  ProtectedTitle
};
