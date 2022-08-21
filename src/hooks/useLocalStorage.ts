import SetState from '@/ts/types';
import { useEffect, useState } from 'react';

type ReturnType<T> = [T, SetState<T>];

const useLocalStorage = <T,>(key: string, defaultValue: T): ReturnType<T> => {
  const getValue = () => {
    const storage = localStorage.getItem(key);
    return storage ? JSON.parse(storage) : defaultValue;
  };

  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
