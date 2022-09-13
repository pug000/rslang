import styled from 'styled-components';

const DifficultWordsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 0 25px;
  margin: 0 auto;
  margin-bottom: 40px;
  max-width: 1100px;
`;

const DifficultWordsTitle = styled.h2`
  color: ${(props) => props.theme.colors.title};
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.h2};
  margin-top: 1.2rem;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (max-width: 560px) {
    font-size: ${({ theme }) => theme.fontSizes.h3};
  }
`;

const DifficultWordsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
  min-height: 30vh; 

  @media (max-width: 950px) {
    align-items: center;
  }
`;

const Note = styled.p`
  margin-top: -30px;
  font-size: 14px;
  color: rgba(0,0,0,0.4);
  font-style: italic;
  text-align: center;
  max-width: 350px;
`;

const LoaderWrapper = styled.div`
  margin-left: -300px;
  margin-top: -150px;

  @media (max-width: 468px) {
    padding-left: 90px;
  }
`;

export {
  DifficultWordsWrapper,
  DifficultWordsTitle,
  DifficultWordsContainer,
  Note,
  LoaderWrapper
};
