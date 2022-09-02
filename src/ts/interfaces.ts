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
interface ErrMessageProps {
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

interface GetNewTokenUserData {
  token: string;
  refreshToken: string;
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

interface FilteredWordData {
  paginatedResults: [{
    _id: string;
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
    textExampleTranslate: string,
    userWord?: {
      difficulty?: number,
      optional?: {
        isDifficultWord?: boolean
      }
    }
  }]
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
  Teammate,
  ProjectDescription,
  ColorProps,
  WordCreateProp,
  GetUserProp,
  FilteredWordData,
  ErrMessageProps,
  GetNewTokenUserData
};
