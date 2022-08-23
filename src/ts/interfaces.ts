interface NavItem {
  id: number,
  value: string,
  link: string,
  icon: JSX.Element
}
interface Btn {
  id: number,
  value: number,
}

interface ResponseWord {
  data: WordData[],
  count: number,
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

interface SingUpUserData {
  email: string;
  id: string;
}
interface SignInUserData {
  content: {
    message: string,
    token: string,
    refreshToken: string,
    userId: string,
    name: string,
  };
  status: number;
}

export {
  Btn, NavItem, WordData, ResponseWord, Track, UserData, SingUpUserData, SignInUserData
};
