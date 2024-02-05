import { Stack, Text, Title } from '@mantine/core';
import { ICommonWord } from '../resources/types';

const ExamplesList = ({ word }: { word: ICommonWord }) => {
  return word.examples.length === 0 ? null : (
    <>
      <Title order={4} color='dimmed'>
        Examples
      </Title>
      <Stack>
        {word.examples.map((ex, i) => (
          <Stack spacing={0} key={i}>
            <Text fw='bold'>{ex.sentence}</Text>
            <Text color='dimmed'>- {ex.translation}</Text>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default ExamplesList;
