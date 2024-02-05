import { Card, Divider, Stack, Title } from '@mantine/core';
import { useParam } from '../hooks/useParam';
import { useWord } from '../services/word.service';
import WordPageHeader from '../components/WordPageHeader';
import TranslationsSections from '../components/TranslationsSections';
import ExamplesList from '../components/ExamplesList';
import RelatedWordsList from '../components/RelatedWordsList';
import DescriptionSection from '../components/DescriptionSection';
import WordPageNoun from '../components/WordPageNoun';
import { IWord } from '../resources/types';
import WordPageAdjective from '../components/WordPageAdjective';
import WordPageVerb from '../components/WordPageVerb';
import WordPageSkeleton from '../skeletons/WordPageSkeleton';

const WordPage = () => {
  const id = useParam();
  const { data, isLoading, isError } = useWord(id);

  if (isError) {
    return (
      <Card withBorder w='100%'>
        <Title order={4} color='red' ta='center'>
          Error happened while fetching this word. Try again.
        </Title>
      </Card>
    );
  }

  if (isLoading) {
    return <WordPageSkeleton />;
  }

  return (
    data && (
      <Card shadow='xs'>
        <Stack>
          <WordPageHeader word={data} />
          <Stack>
            <Divider />
            <TranslationsSections word={data} />
            <DescriptionSection word={data} />
            <Divider />
            <ExamplesList word={data} />
            <Divider />
            {data.partOfSpeech === 'noun' && <WordPageNoun word={data as IWord<'noun'>} />}
            {data.partOfSpeech === 'adjective' && (
              <WordPageAdjective word={data as IWord<'adjective'>} />
            )}
            {data.partOfSpeech === 'verb' && <WordPageVerb word={data as IWord} />}
            <RelatedWordsList word={data} />
          </Stack>
        </Stack>
      </Card>
    )
  );
};

export default WordPage;
