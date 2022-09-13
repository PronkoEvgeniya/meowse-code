export const testPercent = 100;
export const enterKey = 'Enter';
export const nullTextLesson = {
  description: '',
  symbols: [''],
  code: [''],
  task: '',
  id: 0,
  answer: '',
};
export const nullAudioLesson = {
  description: '',
  symbols: [''],
  player: [''],
  task: '',
  id: 0,
  answer: '',
};

export enum TextAreaMessages {
  error = '*упс, что-то ты не то вводишь. наведи на меня и узнай что делать',
  rulesTitle = '1. используй только . и -\n2. длина букв от 1 до 6 символов\n3. разделяй буквы 1 пробелом',
}

export enum Lang {
  ru = 'ru',
  en = 'en',
}

export enum TrainersLength {
  audioRU = 30,
  textRu = 31,
  en = 25,
}

export enum Modals {
  start = 'start',
  login = 'login',
  signup = 'signup',
}

export enum Modes {
  lesson = 'lesson',
  result = 'result',
  task = 'task',
  rules = 'rules',
}

export enum Trainers {
  audio = 'audio',
  text = 'text',
}

export enum Theme {
  light = 'light',
  dark = 'dark',
  theme = 'theme',
}

export enum SidebarButtons {
  open = '>',
  close = '<',
}

export enum LSParameters {
  ruTextLessons = 'lessonsTextRu',
  enTextLessons = 'lessonsTextEn',
  ruAudioLessons = 'lessonsAudioRu',
  enAudioLessons = 'lessonsAudioEn',
  token = 'token',
  lang = 'i18nextLng',
}

export const avatars = ['avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png'];

export enum LessonResults {
  min = 70,
}

export enum Game {
  questionAmount = 15,
}

export enum RegExpTemplates {
  morseLetters = '^[.-]{1,6}$',
  morseSymbols = '^[.-]*$',
  iFlag = 'i',
  'ru' = '^[а-я$]*$',
  'en' = '^[a-z$]*$',
}

export enum URL {
  registration = 'https://ancient-spire-30393.herokuapp.com/api/auth/registration',
  authorization = 'https://ancient-spire-30393.herokuapp.com/api/auth/authorization',
  user = 'https://ancient-spire-30393.herokuapp.com/api/auth/users',
  liders = 'https://ancient-spire-30393.herokuapp.com/api/auth/allusers',
}

export enum ActionTypes {
  registration = 'user/registration',
  authorization = 'user/authorization',
  getUser = 'user/get',
  updateUser = 'user/update',
  getLeaders = 'app/getLeaders',
}

export const MORSE_TABLE = {
  '.-': {
    ru: 'а',
    en: 'a',
  },
  '-...': {
    ru: 'б',
    en: 'b',
  },
  '.--': {
    ru: 'в',
    en: 'w',
  },
  '--.': {
    ru: 'г',
    en: 'g',
  },
  '-..': {
    ru: 'д',
    en: 'd',
  },
  '.': {
    ru: 'е',
    en: 'e',
  },
  '...-': {
    ru: 'ж',
    en: 'v',
  },
  '--..': {
    ru: 'з',
    en: 'z',
  },
  '..': {
    ru: 'и',
    en: 'i',
  },
  '.---': {
    ru: 'й',
    en: 'j',
  },
  '-.-': {
    ru: 'к',
    en: 'k',
  },
  '.-..': {
    ru: 'л',
    en: 'l',
  },
  '--': {
    ru: 'м',
    en: 'm',
  },
  '-.': {
    ru: 'н',
    en: 'n',
  },
  '---': {
    ru: 'о',
    en: 'o',
  },
  '.--.': {
    ru: 'п',
    en: 'p',
  },
  '.-.': {
    ru: 'р',
    en: 'r',
  },
  '...': {
    ru: 'с',
    en: 's',
  },
  '-': {
    ru: 'т',
    en: 't',
  },
  '..-': {
    ru: 'у',
    en: 'u',
  },
  '..-.': {
    ru: 'ф',
    en: 'f',
  },
  '....': {
    ru: 'х',
    en: 'h',
  },
  '-.-.': {
    ru: 'ц',
    en: 'c',
  },
  '--.-': {
    ru: 'щ',
    en: 'q',
  },
  '-.--': {
    ru: 'ы',
    en: 'y',
  },
  '-..-': {
    ru: 'ь',
    en: 'x',
  },
  '---.': 'ч',
  '----': 'ш',
  '.--.-.': 'ъ',
  '..-..': 'э',
  '..--': 'ю',
  '.-.-': 'я',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0',
};
