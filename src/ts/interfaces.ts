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
    bgColor: string,
    btnColor: string,
    icon: JSX.Element,
    note: string
  },
  sprint: {
    name: string,
    description: string,
    bgColor: string,
    btnColor: string,
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
interface Color {
  $color?: string,
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
  totalCount?: [
    {
      count?: number
    }
  ]
}

export {
  GroupButton, NavItem, WordData, Track, Games, UserData, RegisteredUserData,
  LogInUserData, SvgStyles, Color, WordCreateProp, GetUserProp, FilteredWordData
};
