import defaultTheme from '@/styles/theme';
import styled from 'styled-components';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

interface ColorsProps {
  colors: string,
}

interface WordTextProps {
  color: string,
  fontSize: string,
  opacity?: string
}

const stylesBtn = {
  cursor: 'pointer',
  transition: `${defaultTheme.effects.transition}`,
};

const WordsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  grid-area: words;

  @media (max-width: 950px) {
    align-items: center;
  }
`;

const Word = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 10px;
  border-radius: 10px;
  padding: 25px;

  @media (max-width: 950px) {
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    gap: 15px;
    padding: 20px;
  }
`;

const WordImg = styled.img`
  max-width: 250px;
  width: 100%;
  min-height: 200px;
  object-fit: cover;

  @media (max-width: 950px) {
    max-width: fit-content;
    min-height: auto;
  }
`;

const WordInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  width: 100%;
`;

const WordInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 15px;
`;

const WordTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${({ theme }) => theme.fontSizes.text};
  color: ${({ theme }) => theme.colors.title};
  font-weight: 500;
`;

const WordText = styled.div<WordTextProps>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  opacity: ${({ opacity }) => opacity ?? '1'};
`;

const WordPlay = styled(PlayCircleOutlineIcon).attrs({
  style: stylesBtn,
})`
  color: ${({ theme }) => theme.colors.purple};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const WordBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: 950px) {
    flex-direction: row;
    width: 100%;
  }
`;

const DifficultWordBtn = styled(StarBorderIcon).attrs({
  style: stylesBtn,
})`
  color: ${({ theme }) => theme.colors.grey};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const DifficultWordBtnActive = styled(StarIcon).attrs({
  style: stylesBtn,
})`
  color: ${({ theme }) => theme.colors.primaryColor};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const LearnedWordBtn = styled(MenuBookIcon).attrs({
  style: stylesBtn,
}) <ColorsProps>`
  color: ${({ colors }) => colors};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

export {
  WordsContainer, Word, WordImg, WordInfoContainer, WordInfoWrapper, WordTitle, WordText, WordPlay,
  WordBtnContainer, DifficultWordBtn, DifficultWordBtnActive, LearnedWordBtn,
};
