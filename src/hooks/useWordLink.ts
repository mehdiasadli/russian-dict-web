import { ICommonWord } from '../resources/types';
import { useFindWord } from '../services/word.service';

export const useWordLink = (word: ICommonWord) => {
  const pos = word.partOfSpeech;
  const field =
    pos === 'adjective' ? 'adverbPartner' : pos === 'noun' ? 'nounPartner' : 'aspectPair';
  return useFindWord((word[field] as string | string[]) ?? undefined);
};
