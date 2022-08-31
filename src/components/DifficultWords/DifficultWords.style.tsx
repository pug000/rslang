import styled from 'styled-components';

const DifficultWordsContainer = styled.div`
  padding: 20px 25px 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DifficultWordsTitle = styled.h2`
  color: ${(props) => props.theme.colors.title};
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export {
  DifficultWordsContainer,
  DifficultWordsTitle
};
