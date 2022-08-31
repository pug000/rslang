const generateRandomNumber = (max: number) => Math.floor(Math.random() * max) + 1;

const shuffleArray = <T,>(array: T[]) => array
  .map((el) => ({ el, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ el }) => el);

export {
  generateRandomNumber,
  shuffleArray
};
