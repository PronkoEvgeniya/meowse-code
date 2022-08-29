export enum TextAreaMessages {
  error = '*упс, что-то ты не то вводишь. наведи на меня и узнай что делать',
  rulesTitle = '1. используй только . и -\n2. длина букв от 1 до 6 символов\n3. разделяй буквы 1 пробелом',
}

export enum Lang {
  ru = 'ru',
  en = 'en',
}

export enum TranslatorMode {
  encode = 'текст -> морзе',
  decode = 'морзе -> текст',
}

export enum TextTrainerPageMode {
  lesson = 'lesson',
  result = 'result',
}

export enum LSParameters {
  completedTextLessons = 'completedTextTrainerLessons',
}

export enum LessonResults {
  min = 70,
}

export enum RegExpTemplates {
  morseLetters = '^[.-]{1,6}$',
  morseSymbols = '^[.-]*$',
}

export const tutorialContent = [
  {
    description:
      'Добро пожаловать, Евгения! Меня зовут <span>Мяус</span>, я буду рад помогать тебе на курсе',
    btnContent: 'Привет, Мяус!',
  },
  {
    description:
      'В своем личном кабинете ты сможешь узнать подробности о курсе, свои достижения, а так же сменить пароль',
    btnContent: 'Хорошо',
  },
  {
    description: 'Предлагаю начать с практики, что бы открыть тренажер разверни панель слева',
    btnContent: 'Хорошо',
  },
];

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
