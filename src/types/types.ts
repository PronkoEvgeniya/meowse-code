import { MORSE_TABLE } from './constants';

export type TMorseTable = keyof typeof MORSE_TABLE;
export type TLang = 'ru' | 'en';
export type TTrainers = 'audio' | 'text';
export type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};
