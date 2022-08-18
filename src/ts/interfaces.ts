interface NavItem {
  id: number,
  value: string,
  link: string,
}
interface GroupBtn {
  id: number,
  text: string,
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

export { GroupBtn, NavItem, WordData };
