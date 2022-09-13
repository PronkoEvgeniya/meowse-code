const MORSE_TABLE_RU = {
  '.-': 'а',
  '-...': 'б',
  '.--': 'в',
  '--.': 'г',
  '-..': 'д',
  '.': 'е',
  '...-': 'ж',
  '--..': 'з',
  '..': 'и',
  '.---': 'й',
  '-.-': 'к',
  '.-..': 'л',
  '--': 'м',
  '-.': 'н',
  '---': 'о',
  '.--.': 'п',
  '.-.': 'р',
  '...': 'с',
  '-': 'т',
  '..-': 'у',
  '..-.': 'ф',
  '....': 'х',
  '-.-.': 'ц',
  '--.-': 'щ',
  '-.--': 'ы',
  '-..-': 'ь',
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
const MORSE_TABLE_EN = {
  '.-': 'a',
  '-...': 'b',
  '.--': 'w',
  '--.': 'g',
  '-..': 'd',
  '.': 'e',
  '...-': 'v',
  '--..': 'z',
  '..': 'i',
  '.---': 'j',
  '-.-': 'k',
  '.-..': 'l',
  '--': 'm',
  '-.': 'n',
  '---': 'o',
  '.--.': 'p',
  '.-.': 'r',
  '...': 's',
  '-': 't',
  '..-': 'u',
  '..-.': 'f',
  '....': 'h',
  '-.-.': 'c',
  '--.-': 'q',
  '-.--': 'y',
  '-..-': 'x',
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

export const getGameQuestions = (length: number, answersAmount: number, language: string) => {
  const morseSymbols = Object.entries(language === 'ru' ? MORSE_TABLE_RU : MORSE_TABLE_EN);
  const questions = [];
  for (let i = 0; i < length; i++) {
    questions[i] = 1;
  }
  const d = questions.map(() => {
    const randomIndex = Math.floor(Math.random() * morseSymbols.length);
    const taskIndex = Math.random() > 0.5 ? 0 : 1;
    const answerIndex = taskIndex ? 0 : 1;
    const symbol = morseSymbols.splice(randomIndex, 1).flat();
    const task = symbol[taskIndex];
    const answers = [symbol[answerIndex]];
    for (let i = 1; i < answersAmount; i++) {
      const randomIndex = Math.floor(Math.random() * morseSymbols.length);
      answers.push(morseSymbols[randomIndex][answerIndex]);
    }
    return {
      task,
      answers,
    };
  });

  return d;
};
