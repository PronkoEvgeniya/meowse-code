import { MORSE_TABLE } from '../../types/constants';
import { TMorseTable, TLang } from '../../types/types';
import { useAppSelector } from './reduxHooks';

export const useMorse = () => {
  const codes = Object.keys(MORSE_TABLE);
  const codeType = useAppSelector(({ translator: { codeType } }) => codeType);

  const codeToMorse = (value: string): string => {
    let letters = value.trim().toLowerCase().replace(/ё/g, 'е').split('');

    letters = letters.map((letter) => {
      const code = codes.find((code) => {
        const values = MORSE_TABLE[code as TMorseTable];

        return typeof values === 'object'
          ? values.ru === letter || values.en === letter
          : values === letter;
      });

      return code ? code : letter;
    });

    return letters.join(' ');
  };

  const decodeMorse = (value: string): string => {
    let letters = value.trim().split(' ');

    letters = letters.map((letter) => {
      const code = codes.find((code) => code === letter);
      const values = MORSE_TABLE[code as TMorseTable];

      if (code) {
        return typeof values === 'object' ? values[codeType as TLang] : values;
      }

      return letter;
    });

    return letters.join('');
  };

  return { codeToMorse, decodeMorse };
};
