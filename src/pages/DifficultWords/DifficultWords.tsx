import React from 'react'

interface DifficultWordsProps {
  isLoggedIn: boolean | null,
}

const DifficultWords = ({ isLoggedIn }: DifficultWordsProps) => {

  return (
    <div>
      {isLoggedIn && <p>Добро пожаловать в список адских для вас слов</p>}
    </div>
  )
}

export default DifficultWords
