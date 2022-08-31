import styled from 'styled-components';

const DifficultWordsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 0 25px;
  margin: 0 auto;
  margin-bottom: 40px;
  max-width: 1100px;
  min-height: 700px;
`;

const DifficultWordsTitle = styled.h2`
  color: ${(props) => props.theme.colors.title};
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: fixed;
  top: 80px;
`;

export {
  DifficultWordsContainer, DifficultWordsTitle
};
