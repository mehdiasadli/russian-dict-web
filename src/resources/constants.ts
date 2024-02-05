export const OPEN_RUSSIAN_URL = (word: string) =>
  `https://en.openrussian.org/ru/${word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`;
export const YOU_GLISH_URL = (word: string) =>
  `https://youglish.com/pronounce/${word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}/russian`;
