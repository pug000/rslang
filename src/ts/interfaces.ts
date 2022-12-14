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
interface ErrorMessageProps {
  text: string;
  activeErr: boolean;
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

interface GetUserProp {
  name: string,
  email: string,
  password: string
}

interface SvgStyles {
  width: string,
  height: string,
  transition: string,
}

interface WordCreateProp {
  difficulty: string,
  optional: {
    isDifficultWord: string,
  }
}

interface UserWordData extends Omit<WordData, 'id'> {
  _id: string,
  userWord?: WordCreateProp,
}

interface FilteredWordData {
  paginatedResults: UserWordData[],
  totalCount: [
    {
      count: number
    }
  ]
}

interface GameStatistics {
  gameLearnedWords: number,
  percentCorrectWord: number,
  countCorrectAnswers: number,
  maxCountCorrectAnswers: number,
}

interface Statistics {
  learnedWords: number,
  optional: {
    date: string,
    games: {
      [key: string]: GameStatistics,
    }
  }
}

interface DataForCharts {
  name: string,
  sprint: number,
  audio: number,
}

interface DataForTotalStatistics {
  name: string,
  total: number,
  correct: number,
}

interface ColorProps {
  $color?: string,
}

interface Teammate {
  teammateId: number,
  name: string,
  icon: JSX.Element,
  role: string,
  link: string,
  title: string
}

interface ProjectDescription {
  descriptionId: string,
  title: string,
  text: string
}

export {
  GroupButton,
  NavItem,
  WordData,
  Track,
  Games,
  UserData,
  RegisteredUserData,
  LogInUserData,
  SvgStyles,
  GameStatistics,
  Statistics,
  DataForCharts,
  DataForTotalStatistics,
  Teammate,
  ProjectDescription,
  ColorProps,
  WordCreateProp,
  GetUserProp,
  FilteredWordData,
  ErrorMessageProps,
};
