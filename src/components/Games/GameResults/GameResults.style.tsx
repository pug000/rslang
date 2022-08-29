import styled from 'styled-components';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { NavLink } from 'react-router-dom';
import defaultTheme from '@/styles/theme';

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

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const AnswerTitle = styled.h3<{ $color: string }>`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  color: ${({ $color }) => $color};
`;

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const AnswerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AnswerItemText = styled.div`
  display: flex;
  gap: 5px;
`;

const SpanText = styled.span<{ $color?: string }>`
  color: ${({ $color, theme }) => $color || theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.text};
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

const PlayAudioIcon = styled(VolumeUpIcon).attrs({
  style: {
    color: `${defaultTheme.colors.purple}`,
  }
})``;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Link = styled(NavLink)`
  color: ${({ theme }) => theme.colors.textButton};
  background-color: ${({ theme }) => theme.colors.beige};
  font-size: ${({ theme }) => theme.fontSizes.h4};
  padding: 15px;
  border-radius: 10px;
  transition: ${({ theme }) => theme.effects.transition};

  &:link{
    text-decoration: none;
  }

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

export {
  GameResultsWrapper, GameResultsTitle, AnswerTitle, AnswerContainer,
  AnswerItem, AnswerItemText, PlayAudioBtn, PlayAudioIcon, AnswerWrapper,
  GameResultsContainer, Link, BtnContainer, Line, SpanText
};
