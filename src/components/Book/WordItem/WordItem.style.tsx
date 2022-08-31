import defaultTheme from '@/styles/theme';
import styled from 'styled-components';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { ColorProps } from '@/ts/interfaces';

interface WordTextProps extends ColorProps {
  fontSize: string,
  opacity?: string,
}

const stylesButton = {
  transition: `${defaultTheme.effects.transition}`,
};

const Word = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
  border-radius: 10px;
  padding: 25px;
  width: 100%;

  @media (max-width: 950px) {
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    gap: 15px;
    padding: 20px;
  }
`;

const WordImage = styled.img`
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
  color: ${({ $color }) => $color};
  font-size: ${({ fontSize }) => fontSize};
  opacity: ${({ opacity }) => opacity ?? '1'};
`;

const WordPlayAudioButton = styled.button`
  background-color: transparent;
  border: none;
`;

const WordPlayIcon = styled(PlayCircleOutlineIcon).attrs({
  style: stylesButton,
})`
  color: ${({ theme }) => theme.colors.primaryColor};
  cursor: pointer;
  transition: ${defaultTheme.effects.transition};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const WordButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: 950px) {
    flex-direction: row;
    width: 100%;
  }
`;

const DifficultWordButton = styled(StarBorderIcon).attrs({
  style: stylesButton,
})`
  color: ${({ theme }) => theme.colors.grey};
  cursor: pointer;

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const DifficultWordButtonActive = styled(StarIcon).attrs({
  style: stylesButton,
})`
  color: ${({ theme }) => theme.colors.primaryColor};
  cursor: pointer;

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const LearnedWordButton = styled(MenuBookIcon).attrs({
  style: stylesButton,
}) <ColorProps>`
  color: ${({ $color }) => $color};
  cursor: pointer;

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

export {
  Word, WordImage, WordInfoContainer, WordInfoWrapper, WordTitle, WordText,
  WordPlayIcon, WordButtonContainer, DifficultWordButton, DifficultWordButtonActive,
  LearnedWordButton, WordPlayAudioButton,
};
