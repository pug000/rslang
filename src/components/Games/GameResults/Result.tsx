import { baseUrl } from '@/api';
import { WordData } from '@/ts/interfaces';
import React, { useEffect, useRef, useState } from 'react';
import {
  ResultContainer, ResultTitle, ResultWrapper, ResultItem, PlayAudioBtn, PlayAudioIcon,
  ResultText,
} from './GameResults.style';

interface ResultProps {
  answers: WordData[],
  title: string,
  color: string,
}

function Result(
  {
    answers,
    title,
    color,
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
        $color={color}
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
              <PlayAudioIcon $color={color} />
            </PlayAudioBtn>
            <ResultText>
              {`${word} - ${wordTranslate}`}
            </ResultText>
          </ResultItem>
        ))}
      </ResultWrapper>
    </ResultContainer>
  );
}

export default Result;
