import { Stack, Text, Title } from '@mantine/core';
import { ICommonWord } from '../resources/types';

const TranslationsSections = ({ word }: { word: ICommonWord }) => {
  return (
    <>
      <Title order={4} color='dimmed'>
        Translations
      </Title>
      <Stack spacing={4}>
        {word.translations.map((tr, i) => (
          <Text key={tr + i}>
            {i + 1}. {tr}
          </Text>
        ))}
      </Stack>
    </>
  );
};

export default TranslationsSections;
