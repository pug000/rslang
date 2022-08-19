import React from 'react'
import { DifficultWordsContainer, DifficultWordsTitle } from './DifficultWords.style';

interface DifficultWordsProps {
  isLoggedIn: boolean | null,
}

const DifficultWords = ({ isLoggedIn }: DifficultWordsProps) => {

  if (!isLoggedIn) return null;
  return (
    <DifficultWordsContainer>
      {isLoggedIn && <DifficultWordsTitle>Сложные слова</DifficultWordsTitle>}
    </DifficultWordsContainer>
  )
}

export default DifficultWords
