import { baseUrl } from '@/api';
import defaultTheme from '@/styles/theme';
import { WordData } from '@/ts/interfaces';
import React, { useEffect, useRef, useState } from 'react';
import {
  AnswerContainer, AnswerTitle, AnswerWrapper, AnswerItem, PlayAudioBtn, PlayAudioIcon,
  AnswerItemText,
  SpanText,
} from './GameResults.style';

interface AnswersProps {
  answers: WordData[],
  title: string,
  colorTitle: string,
}

function Answers(
  {
    answers,
    title,
    colorTitle,
  }: AnswersProps
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
    <AnswerContainer>
      <AnswerTitle
        $color={colorTitle}
      >
        {`${title}: ${answers.length}`}
      </AnswerTitle>
      <AnswerWrapper>
        {answers.map((
          {
            id,
            word,
            wordTranslate,
            audio
          }
        ) => (
          <AnswerItem key={id}>
            <PlayAudioBtn
              onClick={() => playOnClick(`${baseUrl}/${audio}`)}
            >
              <PlayAudioIcon />
            </PlayAudioBtn>
            <AnswerItemText>
              <SpanText
                $color={defaultTheme.colors.purple}
              >
                {word}
              </SpanText>
              <SpanText>-</SpanText>
              <SpanText>{wordTranslate}</SpanText>
            </AnswerItemText>
          </AnswerItem>
        ))}
      </AnswerWrapper>
    </AnswerContainer>
  );
}

export default Answers;
