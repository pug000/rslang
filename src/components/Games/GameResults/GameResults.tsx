import defaultTheme from '@/styles/theme';
import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';
import React from 'react';
import Result from './Result';
import {
  BtnContainer,
  GameResultsContainer, GameResultsTitle, GameResultsWrapper, Line, Link
} from './GameResults.style';

interface GameResultsProps {
  correctAnswers: WordData[],
  incorrectAnswers: WordData[],
  setCorrectAnswers: SetState<WordData[]>,
  setIncorrectAnswers: SetState<WordData[]>,
  path: string,
  changeGameState: (value: boolean) => void,
  mainColor: string,
}

function GameResults(
  {
    correctAnswers,
    incorrectAnswers,
    setCorrectAnswers,
    setIncorrectAnswers,
    path,
    changeGameState,
    mainColor,
  }: GameResultsProps,
) {
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

  const clearAnswersState = () => {
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
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
          onClick={() => {
            changeGameState(false);
            clearAnswersState();
          }}
        >
          Играть ещё
        </Link>
        <Link
          to="/games"
          $color={mainColor}
          onClick={() => {
            changeGameState(false);
            clearAnswersState();
          }}
        >
          К списку игр
        </Link>
      </BtnContainer>
    </>
  );
}

export default GameResults;
