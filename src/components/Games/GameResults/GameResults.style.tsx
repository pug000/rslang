import styled from 'styled-components';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { NavLink } from 'react-router-dom';

const GameResultsContainer = styled.div`

`;

const GameResultsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const GameResultsTitle = styled.h2`

`;

const AnswerContainer = styled.div`

`;

const AnswerTitle = styled.h3`

`;

const AnswerWrapper = styled.div`

`;

const AnswerItem = styled.div`

`;

const AnswerItemText = styled.p`

`;

const PlayAudioBtn = styled.button`

`;

const PlayAudioIcon = styled(VolumeUpIcon)`

`;

const Link = styled(NavLink)`
  color: ${({ theme }) => theme.colors.bgWhite};

  &:link{
    text-decoration: none;
  }
`;

export {
  GameResultsWrapper, GameResultsTitle, AnswerTitle, AnswerContainer,
  AnswerItem, AnswerItemText, PlayAudioBtn, PlayAudioIcon, AnswerWrapper,
  GameResultsContainer, Link
};
