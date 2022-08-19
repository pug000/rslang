import styled from 'styled-components';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import defaultTheme from '@/styles/theme';

interface BookItemTextProps {
  color: string,
  fontSize: string,
  opacity?: string
}

interface LearnedWordBtnProps {
  colors: string,
}

const stylesBtn = {
  cursor: 'pointer',
  transition: `${defaultTheme.effects.transition}`,
};

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 0 25px;
`;

const BookTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.fontSizes.h3};
  color: ${({ theme }) => theme.colors.purple};
`;

const BookWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
`;

const BookGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 7px;
  border-radius: 5px;
  gap: 10px;
  position: sticky;
  top: 15px;
  box-shadow: 0px 3px 3px 0px rgb(0 0 0 / 20%),
  0px 3px 4px 0px rgb(0 0 0 / 14%),
  0px 1px 8px 0px rgb(0 0 0 / 12%);
`;

const BookGroupTitle = styled.h4`
  color: ${({ theme }) => theme.colors.purple};
  font-size: ${({ theme }) => theme.fontSizes.text};
`;

const BookGroupBtn = styled.button`
  width: 55px;
  height: 55px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: ${(props) => props.theme.effects.transition};
  background-color: ${(props) => props.theme.colors.purple};
  color: ${(props) => props.theme.colors.bgWhite};

  &:hover {
    opacity: ${(props) => props.theme.effects.hoverOpacity};
  }
`;

const BookItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 950px) {
    align-items: center;
  }
`;

const BookItem = styled.div`
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

const BookItemImg = styled.img`
  max-width: 250px;
  width: 100%;
  min-height: 200px;
  object-fit: cover;

  @media (max-width: 950px) {
    max-width: fit-content;
    min-height: auto;
  }
`;

const BookItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  width: 100%;
`;

const BookItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 15px;
`;

const BookItemTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${({ theme }) => theme.fontSizes.text};
  color: ${({ theme }) => theme.colors.title};
  font-weight: 500;
`;

const BookItemText = styled.div<BookItemTextProps>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  opacity: ${({ opacity }) => opacity ?? '1'};
`;

const BookItemPlay = styled(PlayCircleOutlineIcon).attrs({
  style: stylesBtn,
})`
  color: ${({ theme }) => theme.colors.purple};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const BookItemBtnContainer = styled.div`
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
}) <LearnedWordBtnProps>`
  color: ${({ colors }) => colors};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

export {
  BookContainer,
  BookTitle,
  BookWrapper,
  BookGroup,
  BookItemsContainer,
  BookItem,
  BookItemImg,
  BookGroupBtn,
  BookGroupTitle,
  BookItemInfoContainer,
  BookItemBtnContainer,
  BookItemTitle,
  BookItemText,
  BookItemInfoWrapper,
  BookItemPlay,
  DifficultWordBtn,
  DifficultWordBtnActive,
  LearnedWordBtn,
};
