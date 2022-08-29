import styled from 'styled-components';
import defaultTheme from '@/styles/theme';

interface ResultProps {
  isCorrect: boolean;
}

interface StrikeProps {
  strike: number;
}

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

const Result = styled.p<ResultProps>`
  font-size: ${defaultTheme.fontSizes.h4};
  font-style: italic;
  color: rgba(0,0,0,0.4);
  transition: ${defaultTheme.effects.transition};

  span {
    ${({ isCorrect }) => !isCorrect && `
      color: ${defaultTheme.colors.pink};
    `}

    ${({ isCorrect }) => isCorrect && `
      color: ${defaultTheme.colors.blue};
    `}
  }
`;

const TextBlock = styled.div`
  text-align: center;
  font-size: ${defaultTheme.fontSizes.h3};
  min-width: 300px;
  max-width: 320px;
  height: 150px;
`;

const Word = styled.p`
  border-bottom: 4px solid ${defaultTheme.colors.blue};
  padding-bottom: 5px;
`;

const Translation = styled.p`
  padding-top: 5px;
`;

const SprintButtons = styled.div`
  display: flex;
  gap: 15px;

  Button {
    background-color: ${defaultTheme.colors.blue};
  }
`;

const Note = styled.p`
  margin-top: -30px;
  font-size: 14px;
  color: rgba(0,0,0,0.2);
  font-style: italic;
`;

const StrikeBlock = styled.div`
  display: flex;
  margin-top: -40px;
  gap: 10px;
  position: relative;
`;

const Strike = styled.div<StrikeProps>`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  border: 2px solid rgba(255,255,255,0.8);
  color: transparent;
  text-align: center;

  &#strike1 {
    ${({ strike }) => strike && `
    background-color: ${defaultTheme.colors.blue};
    color: ${defaultTheme.colors.text}
  `}
  }
  &#strike2 {
    ${({ strike }) => (strike === 2 || strike === 3) && `
    background-color: ${defaultTheme.colors.blue};
    color: ${defaultTheme.colors.text}
  `}
  }
  &#strike3 {
    ${({ strike }) => strike === 3 && `
    background-color: ${defaultTheme.colors.blue};
    color: ${defaultTheme.colors.text}
  `}
  }
`;

const StrikeMessage = styled.p`
  position: absolute;
  bottom: -115%;
  left: 50%;
  transform: translateX(-50%);
  color: ${defaultTheme.colors.blue};
  width: 300px;
  text-align: center;
  font-weight: bold;
`;

export {
  SprintGameContainer, SprintGameWrapper, Result,
  TextBlock, Word, Translation, SprintButtons, Note,
  StrikeBlock, Strike, StrikeMessage
};
