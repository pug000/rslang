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

interface UserData {
  email: string;
  password: string;
}

interface RegisteredUserData {
  email: string;
  id: string;
}
interface LoginUserData {
  content: {
    message: string,
    token: string,
    refreshToken: string,
    userId: string,
    name: string,
  }
}

export {
  GroupButton, NavItem, WordData, Track, UserData, RegisteredUserData, LoginUserData
};
