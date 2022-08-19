import { Btn } from '@/ts/interfaces';

const getPages = (totalCount: number) => {
  const result: Btn[] = [];

  for (let i = 0; i < totalCount; i += 1) {
    result.push({ id: i, value: i });
  }

  return result;
};

export default getPages;
