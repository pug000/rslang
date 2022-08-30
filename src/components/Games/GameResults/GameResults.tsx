import defaultTheme from '@/styles/theme';
import { Statistics, WordData } from '@/ts/interfaces';
import React, { useContext, useEffect } from 'react';
import GameContext from '@/contexts/GameContext';
import { getUserStatistics, updateUserStatistics } from '@/api';
import Result from './Result';
import {
  BtnContainer,
  GameResultsContainer, GameResultsTitle, GameResultsWrapper, Line, Link
} from './GameResults.style';

interface GameResultsProps {
  correctAnswers: WordData[],
  incorrectAnswers: WordData[],
  game: string,
  mainColor: string,
  isShowResult: boolean,
  words: WordData[],
}

function GameResults(
  {
    correctAnswers,
    incorrectAnswers,
    game,
    mainColor,
    isShowResult,
    words,
  }: GameResultsProps,
) {
  const {
    clearGameState,
    userId,
    token,
    isLoggedIn
  } = useContext(GameContext);

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

  useEffect(() => {
    if (isShowResult && isLoggedIn) {
      (async () => {
        const data = await getUserStatistics(userId, token);
        const learnedWords = data.learnedWords + words.length;
        const gameLearnedWords = data.optional[game].gameLearnedWords + words.length;
        const correctAnswersCount = data.optional[game].correctAnswersCount + correctAnswers.length;
        const percentCorrectWord = Math.round((correctAnswersCount * 100) / gameLearnedWords);

        const statistics: Statistics = {
          learnedWords,
          optional: {
            ...data.optional,
            [game]: {
              gameLearnedWords,
              correctAnswersCount,
              percentCorrectWord,
            }
          }
        };
        await updateUserStatistics(userId, token, statistics);
      })();
    }
  }, [isShowResult]);

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
          to={`/games/${game}`}
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
