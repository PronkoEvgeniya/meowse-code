import { MORSE_TABLE } from './constants';

export type TMorseTable = keyof typeof MORSE_TABLE;
export type TLang = 'ru' | 'en';
