export interface IUser<
  F extends boolean = false,
  L extends boolean = false,
  K extends boolean = false
> {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  isAdmin: boolean;
  favorites: F extends true ? ICommon[] : string[];
  learning: L extends true ? ICommon[] : string[];
  knows: K extends true ? ICommon[] : string[];
  updatedAt: Date;
  createdAt: Date;
}

export type POS = 'verb' | 'adjective' | 'noun' | 'other';
export type Aspect = 'perfective' | 'imperfective' | 'perfective & imperfective' | 'other';
export type Gender = 'masculine' | 'feminine' | 'neuter' | 'other';

export interface IVerb {
  verbalAspect: Aspect;
  aspectPair: string[];
  imperativeMood: {
    s: string;
    p: string;
  };
  verbParticiples: {
    active_present: string;
    active_past: string;
    passive_present: string;
    passive_past: string;
    gerund_present: string;
    gerund_past: string;
  };
  verbConjugation: {
    past: {
      m: string;
      f: string;
      n: string;
      p: string;
    };
    present: {
      fps: string;
      sps: string;
      tpp: string;
    };
  };
}
export interface INoun {
  isAnimate: boolean;
  gender: Gender;
  nounPartner: string;
  nounDeclension: {
    n: [string, string];
    g: [string, string];
    a: [string, string];
    d: [string, string];
    i: [string, string];
    p: [string, string];
  };
}
export interface IAdj {
  adverbPartner: string;
  shortForms: {
    m: string;
    f: string;
    n: string;
    p: string;
  };
  degrees: {
    comparative: string;
    superlative: string;
  };
}
interface ICommon {
  _id: string;
  rank: number;
  word: string;
  plainWord: string;
  translations: string[];
  partOfSpeech: POS;
  examples: { sentence: string; translation: string }[];
  related: { word: string; translation: string }[];
  description?: string;
  favorites: string[];
  learning: string[];
  knows: string[];
}

export type IWord<P extends POS = 'verb'> = P extends 'verb'
  ? IVerb & ICommon
  : P extends 'noun'
  ? INoun & ICommon
  : P extends 'adjective'
  ? IAdj & ICommon
  : ICommon;

export type ICommonWord = Partial<IVerb> & Partial<INoun> & Partial<IAdj> & ICommon;

export type ApiError = {
  message: string;
  status: number;
};
