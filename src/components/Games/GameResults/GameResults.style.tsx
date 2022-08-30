import styled from 'styled-components';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { NavLink } from 'react-router-dom';

const GameResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 75%;
  justify-content: center;
  align-items: center;
`;

const GameResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  max-width: 600px;
  padding: 30px 35px 25px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
`;

const GameResultsTitle = styled.h2`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 35px;
  font-size: ${({ theme }) => theme.fontSizes.h3};
`;

const Line = styled.div`
  margin: 60px 0;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.textBold};
  height: 1px;
  flex-shrink: 0;
  opacity: 0.3;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ResultTitle = styled.h3<{ $color: string }>`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  color: ${({ $color }) => $color};
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ResultText = styled.div`
  display: flex;
  gap: 5px;
  font-size: ${({ theme }) => theme.fontSizes.text};
  color: ${({ theme }) => theme.colors.text};
`;

const PlayAudioBtn = styled.button`
  background-color: transparent;
  display: flex;
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const PlayAudioIcon = styled(VolumeUpIcon).attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  }
})) <{ $color: string }>``;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 70%;
`;

const Link = styled(NavLink)`
  &:link{
    text-decoration: none;
  }
`;

export {
  GameResultsWrapper, GameResultsTitle, ResultTitle, ResultContainer,
  ResultItem, ResultText, PlayAudioBtn, PlayAudioIcon, ResultWrapper,
  GameResultsContainer, Link, BtnContainer, Line
};