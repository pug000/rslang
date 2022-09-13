import { WordData } from '@/ts/interfaces';

const calculationTotalCountPages = (userWords: WordData[]) => {
  let countPage: number;
  if (userWords.length <= 20) {
    countPage = 1;
  } else {
    countPage = Math.ceil(userWords.length / 20);
  }
  return countPage;
};

export default calculationTotalCountPages;
