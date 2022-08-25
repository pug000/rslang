import { WordData } from '@/ts/interfaces';
import { SetState, Answers } from '@/ts/types';
import { shuffleArray } from '@/utils/randomize';
import React, { useEffect, useState } from 'react';
import {
  AudioBtn, AudioGameBtn, AudioIcon, AudioGameOptions,
  AudioGameContolBtn, AudioGameWrapper, Link, AudioGameControls, CloseIconSvg,
  FullscreenIconSvg, FullscreenExitIconSvg, AudioGameContainer,
} from './AudioGame.style';

interface AudioGameProps {
  words: WordData[],
  setIsGameStarted: SetState<boolean>,
}

function AudioGame(
  {
    words,
    setIsGameStarted,
  }: AudioGameProps
) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordData>(words[index]);
  const [wordsOptions, setWordsOptions] = useState<string[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Answers[]>([]);
  const [rightAnswers, setRightAnswers] = useState<Answers[]>([]);

  useEffect(() => {
    if (index > 0 && index <= words.length - 1) {
      setCurrentWord(words[index]);
    }
  }, [index]);

  useEffect(() => {
    const wrongOptions = shuffleArray(words)
      .filter((item) => item.id !== currentWord.id)
      .map((item) => item.wordTranslate)
      .slice(0, 4);
    setWordsOptions(shuffleArray([currentWord.wordTranslate, ...wrongOptions]));
  }, [currentWord]);

  return (
    <AudioGameContainer>
      <AudioGameControls>
        <AudioGameContolBtn>
          <Link to="/games" onClick={() => setIsGameStarted(false)}><CloseIconSvg /></Link>
        </AudioGameContolBtn>
        <AudioGameContolBtn>
          {!isFullscreen ? <FullscreenIconSvg /> : <FullscreenExitIconSvg />}
        </AudioGameContolBtn>
      </AudioGameControls>
      <AudioGameWrapper>
        <AudioBtn>
          <AudioIcon />
          {currentWord.word}
        </AudioBtn>
        <AudioGameOptions>
          {wordsOptions.map((el) => (
            <AudioGameBtn key={el} onClick={() => setIndex(index + 1)}>{el}</AudioGameBtn>
          ))}
        </AudioGameOptions>
      </AudioGameWrapper>
      <AudioGameWrapper>
        <AudioGameBtn onClick={() => setIndex(index + 1)}>Не знаю</AudioGameBtn>
      </AudioGameWrapper>
    </AudioGameContainer>
  );
}

export default AudioGame;
