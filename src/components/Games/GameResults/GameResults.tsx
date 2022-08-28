import { WordData } from '@/ts/interfaces';
import React from 'react';
import Answers from './Answers';
import {
  GameResultsContainer, GameResultsTitle, GameResultsWrapper, Link
} from './GameResults.style';

interface GameResultsProps {
  correctAnswers: WordData[],
  incorrectAnswers: WordData[],
  path: string,
  changeGameState: (value: boolean) => void,
}

function GameResults(
  {
    correctAnswers,
    incorrectAnswers,
    path,
    changeGameState,
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

  return (
    <GameResultsContainer>
      <GameResultsWrapper>
        <GameResultsTitle>{setResultTitle()}</GameResultsTitle>
        <Answers
          answers={correctAnswers}
          title="Правильно"
        />
        <Answers
          answers={incorrectAnswers}
          title="Неправильно"
        />
      </GameResultsWrapper>
      <GameResultsWrapper>
        <Link
          to={`/games/${path}`}
          onClick={() => changeGameState(false)}
        >
          Играть ещё
        </Link>
        <Link
          to="/games"
          onClick={() => changeGameState(false)}
        >
          К списку игр
        </Link>
      </GameResultsWrapper>
    </GameResultsContainer>
  );
}

export default GameResults;
