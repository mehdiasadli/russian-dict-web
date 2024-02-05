export type KeyType = 'letter' | 'del' | 'space' | 'empty';
export type KB = {
  label?: string;
  type?: KeyType;
  span?: number;
};
export const keyboard: KB[] = [
  { label: 'ё' },
  { label: 'й' },
  { label: 'ц' },
  { label: 'у' },
  { label: 'к' },
  { label: 'е' },
  { label: 'н' },
  { label: 'г' },
  { label: 'ш' },
  { label: 'щ' },
  { label: 'з' },
  { label: 'х' },
  { label: 'ъ' },
  { label: 'Del.', type: 'del', span: 2 },
  { type: 'empty', span: 2 },
  { label: 'ф' },
  { label: 'ы' },
  { label: 'в' },
  { label: 'а' },
  { label: 'п' },
  { label: 'р' },
  { label: 'о' },
  { label: 'л' },
  { label: 'д' },
  { label: 'ж' },
  { label: 'э' },
  { type: 'empty', span: 2 },
  { type: 'empty', span: 3 },
  { label: 'я' },
  { label: 'ч' },
  { label: 'с' },
  { label: 'м' },
  { label: 'и' },
  { label: 'т' },
  { label: 'ь' },
  { label: 'б' },
  { label: 'ю' },
  { type: 'empty', span: 3 },
  { type: 'empty', span: 2 },
  { label: 'Space', type: 'space', span: 11 },
  { type: 'empty', span: 2 },
];