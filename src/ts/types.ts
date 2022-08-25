import { WordData } from './interfaces';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Answers = Pick<WordData, 'audio' | 'word' | 'wordTranslate'>;

export { SetState, Answers };
