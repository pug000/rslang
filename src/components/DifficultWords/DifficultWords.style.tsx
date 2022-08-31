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
  font-weight: 700;
  margin-top: 1.2rem;
  margin-bottom: 1.5rem;
`;

const DifficultWordsContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 30px;
grid-area: words;
align-items: center;
justify-content: center;
min-height: 600px;

@media (max-width: 950px) {
  align-items: center;
}
`;

export {
  DifficultWordsWrapper, DifficultWordsTitle, DifficultWordsContainer
};
