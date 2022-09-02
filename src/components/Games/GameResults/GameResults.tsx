import React, {
  useContext,
  useEffect
} from 'react';
import defaultTheme from '@/styles/theme';

import GameContext from '@/contexts/GameContext';

import Button from '@/Button';

import {
  getUserStatistics,
  updateUserStatistics
} from '@/api';

import {
  Statistics,
  WordData
} from '@/ts/interfaces';

import Result from './Result';

import {
  ButtonContainer,
  GameResultsContainer,
  GameResultsTitle,
  GameResultsWrapper,
  Line,
  Link
} from './GameResults.style';

interface GameResultsProps {
  correctAnswers: WordData[],
  incorrectAnswers: WordData[],
  maxCount: number,
  game: string,
  mainColor: string,
  words: WordData[],
}

function GameResults(
  {
    correctAnswers,
    incorrectAnswers,
    maxCount,
    game,
    mainColor,
    words,
  }: GameResultsProps,
) {
  const {
    clearGameState,
    userId,
    token,
    isLoggedIn,
    isShowResult,
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
        const gameLearnedWords = data.optional.games[game].gameLearnedWords + words.length;
        const countCorrectAnswers = data.optional.games[game].countCorrectAnswers + correctAnswers.length;
        const percentCorrectWord = Math.round((countCorrectAnswers * 100) / gameLearnedWords);
        const maxCountCorrectAnswers = maxCount > data.optional.games[game].maxCountCorrectAnswers
          ? maxCount
          : data.optional.games[game].maxCountCorrectAnswers;

        const statistics: Statistics = {
          learnedWords,
          optional: {
            ...data.optional,
            games: {
              ...data.optional.games,
              [game]: {
                gameLearnedWords,
                countCorrectAnswers,
                percentCorrectWord,
                maxCountCorrectAnswers,
              }
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
      <ButtonContainer>
        <Link
          to={`/games/${game}`}
        >
          <Button
            id={game}
            title="Играть ещё"
            callback={clearGameState}
            color={mainColor}
          />
        </Link>
        <Link
          to="/games"
        >
          <Button
            id="games"
            title="К списку игр"
            callback={clearGameState}
            color={mainColor}
          />
        </Link>
      </ButtonContainer>
    </>
  );
}

export default GameResults;
