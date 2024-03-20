import { MORSE_TABLE } from '../../types/constants';
import { TMorseTable, TLang } from '../../types/types';
import { useAppSelector } from './reduxHooks';

export const useMorse = () => {
  const codes = Object.keys(MORSE_TABLE);
  const language = useAppSelector(({ translator: { language } }) => language);

  const encode = (word: string): string => {
    let letters = word.trim().toLowerCase().replace(/ё/g, 'е').split('');

    letters = letters.map((letter) => {
      const code = codes.find((code) => {
        const value = MORSE_TABLE[code as TMorseTable];

        return typeof value === 'object'
          ? value.ru === letter || value.en === letter
          : value === letter;
      });

      return code || letter;
    });

    return letters.join(' ');
  };

  const decode = (word: string): string => {
    let letters = word.trim().split(' ');

    letters = letters.map((letter) => {
      const code = codes.find((code) => code === letter);
      const value = MORSE_TABLE[code as TMorseTable];

      if (code) {
        return typeof value === 'object' ? value[language as TLang] : value;
      }

      return letter;
    });

    return letters.join('');
  };

  return { encode, decode };
};
