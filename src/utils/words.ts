import { getWordsFromApi } from '@/api';
import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';

const getWords = async (
  currentGroup: number,
  currentPage: number,
  setState: SetState<WordData[]>,
  setLoading: SetState<boolean>,
) => {
  setLoading(true);
  const res = await getWordsFromApi(currentGroup, currentPage);
  setState(res);
  setLoading(false);
};

export default getWords;
