import { Flex, Stack, Title } from '@mantine/core';
import { ICommonWord } from '../resources/types';
import InfoOverall from './InfoOverall';
import WordActions from './WordActions';

const WordPageHeader = ({ word }: { word: ICommonWord }) => {
  return (
    <Flex justify='space-between'>
      <Stack spacing={5}>
        <Flex>
          <Title sx={{ letterSpacing: '2px' }}>
            {word.rank}. {word.word}
          </Title>
        </Flex>
        <InfoOverall word={word} pos={word.partOfSpeech} />
      </Stack>
      <WordActions word={word} />
    </Flex>
  );
};

export default WordPageHeader;
