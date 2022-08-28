import { baseUrl } from '@/api';
import { WordData } from '@/ts/interfaces';
import React, { useEffect, useRef, useState } from 'react';
import {
  AnswerContainer, AnswerTitle, AnswerWrapper, AnswerItem, PlayAudioBtn, PlayAudioIcon,
  AnswerItemText,
} from './GameResults.style';

interface AnswersProps {
  answers: WordData[],
  title: string,
}

function Answers(
  {
    answers,
    title,
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
      <AnswerTitle>
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
              {`${word} - ${wordTranslate}`}
            </AnswerItemText>
          </AnswerItem>
        ))}
      </AnswerWrapper>
    </AnswerContainer>
  );
}

export default Answers;
