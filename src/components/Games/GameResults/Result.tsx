import { baseUrl } from '@/api';
import defaultTheme from '@/styles/theme';
import { WordData } from '@/ts/interfaces';
import React, { useEffect, useRef, useState } from 'react';
import {
  ResultContainer, ResultTitle, ResultWrapper, ResultItem, PlayAudioBtn, PlayAudioIcon,
  ResultTextBlock, ResultText,
} from './GameResults.style';

interface ResultProps {
  answers: WordData[],
  title: string,
  colorTitle: string,
}

function Result(
  {
    answers,
    title,
    colorTitle,
  }: ResultProps
) {
  const audioRef = useRef(new Audio());
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const playOnClick = (url: string) => {
    audioRef.current.src = url;
    setIsPlayingAudio(true);
  };

  useEffect(() => {
    if (isPlayingAudio) {
      audioRef.current.play();
      setIsPlayingAudio(false);
    }
  }, [isPlayingAudio]);

  return (
    <ResultContainer>
      <ResultTitle
        $color={colorTitle}
      >
        {`${title}: ${answers.length}`}
      </ResultTitle>
      <ResultWrapper>
        {answers.map((
          {
            id,
            word,
            wordTranslate,
            audio
          }
        ) => (
          <ResultItem key={id}>
            <PlayAudioBtn
              onClick={() => playOnClick(`${baseUrl}/${audio}`)}
            >
              <PlayAudioIcon />
            </PlayAudioBtn>
            <ResultTextBlock>
              <ResultText
                $color={defaultTheme.colors.purple}
              >
                {word}
              </ResultText>
              <ResultText>-</ResultText>
              <ResultText>{wordTranslate}</ResultText>
            </ResultTextBlock>
          </ResultItem>
        ))}
      </ResultWrapper>
    </ResultContainer>
  );
}

export default Result;
