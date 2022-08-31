interface NavItem {
  id: number,
  value: string,
  link: string,
  icon: JSX.Element
}
interface GroupButton {
  id: number,
  value: number,
  text: string,
  color: string,
}

interface WordData {
  id: string;
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

interface Track {
  id: number,
  src: string,
  ref: React.MutableRefObject<HTMLAudioElement>,
  onEnded: HTMLAudioElement | null,
}
interface Games {
  audio: {
    name: string,
    description: string,
    backgroundColor: string,
    buttonColor: string,
    icon: JSX.Element,
    note: string
  },
  sprint: {
    name: string,
    description: string,
    backgroundColor: string,
    buttonColor: string,
    icon: JSX.Element,
    note: string
  }
}

interface UserData {
  email: string;
  password: string;
}

interface RegisteredUserData {
  email: string;
  id: string;
}
interface LogInUserData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name?: string;
}

interface SvgStyles {
  width: string,
  height: string,
  transition: string,
}

interface GameStatistics {
  gameLearnedWords: number,
  percentCorrectWord: number,
  correctAnswersCount: number,
}

interface Statistics {
  learnedWords: number,
  optional: {
    [key: string]: GameStatistics,
  }
}

interface ColorProps {
  $color?: string,
}

export {
  GroupButton, NavItem, WordData, Track, Games, UserData, RegisteredUserData,
  LogInUserData, SvgStyles, GameStatistics, Statistics, ColorProps,
};
