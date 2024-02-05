import { Card, Grid } from '@mantine/core';
import { useSearch } from '../store/useSearch';
import { KB, KeyType, keyboard } from '../resources/keyboard';
import KeyboardButton from './KeyboardButton';

const RussianKeyboard = ({ setValue }: { setValue: (str: string) => void }) => {
  const { onSearchInput, searchQuery } = useSearch();

  const onClick = (k: KB): Record<KeyType, () => void> => ({
    letter: () => {
      const newValue = searchQuery + k.label;

      onSearchInput(newValue);
      setValue(newValue);
    },
    del: () => {
      if (searchQuery.length === 0) {
        return;
      }

      onSearchInput(searchQuery.substring(0, searchQuery.length - 1));
      setValue(searchQuery.substring(0, searchQuery.length - 1));
    },
    space: () => {
      if (searchQuery.length === 0) {
        return;
      }

      onSearchInput(searchQuery + ' ');
      setValue(searchQuery + ' ');
    },
    empty: () => {},
  });

  return (
    <Card>
      <Grid columns={15} gutter={3}>
        {keyboard.map((k, i) => (
          <KeyboardButton
            keyType={k.type ?? 'letter'}
            span={k.span ?? 1}
            disabled={k.type === 'empty'}
            key={k.label + ':' + i}
            onClick={onClick(k)[k.type ?? 'letter']}
          >
            {k.label}
          </KeyboardButton>
        ))}
      </Grid>
    </Card>
  );
};

export default RussianKeyboard;
