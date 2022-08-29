import defaultTheme from '@/styles/theme';
import { WordData } from '@/ts/interfaces';
import React, { useContext } from 'react';
import GameContext from '@/contexts/GameContext';
import Result from './Result';
import {
  BtnContainer,
  GameResultsContainer, GameResultsTitle, GameResultsWrapper, Line, Link
} from './GameResults.style';

interface GameResultsProps {
  correctAnswers: WordData[],
  incorrectAnswers: WordData[],
  path: string,
  mainColor: string,
}

function GameResults(
  {
    correctAnswers,
    incorrectAnswers,
    path,
    mainColor,
  }: GameResultsProps,
) {
  const { clearGameState } = useContext(GameContext);
  const setResultTitle = () => {
    if (correctAnswers.length >= 5
      && correctAnswers.length < 10) {
      return 'Неплохо, но есть над чем поработать!';
    }

    if (correctAnswers.length > 10) {
      return 'Поздравляем, отличный результат!';
    }

    return 'В этот раз не получилось, но продолжай тренироваться!';
  };

  return (
    <>
      <GameResultsContainer>
        <GameResultsWrapper>
          <GameResultsTitle>{setResultTitle()}</GameResultsTitle>
          <Result
            answers={correctAnswers}
            title="Правильно"
            color={defaultTheme.colors.blue}
          />
          <Line />
          <Result
            answers={incorrectAnswers}
            title="Неправильно"
            color={defaultTheme.colors.pink}
          />
        </GameResultsWrapper>
      </GameResultsContainer>
      <BtnContainer>
        <Link
          to={`/games/${path}`}
          $color={mainColor}
          onClick={clearGameState}
        >
          Играть ещё
        </Link>
        <Link
          to="/games"
          $color={mainColor}
          onClick={clearGameState}
        >
          К списку игр
        </Link>
      </BtnContainer>
    </>
  );
}

export default GameResults;
