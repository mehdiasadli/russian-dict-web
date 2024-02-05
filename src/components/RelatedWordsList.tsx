import { SimpleGrid, Title } from '@mantine/core';
import { ICommonWord } from '../resources/types';
import RelatedWordCard from './RelatedWordCard';

const RelatedWordsList = ({ word }: { word: ICommonWord }) => {
  return word.related.length === 0 ? null : (
    <>
      <Title order={4} color='dimmed'>
        Related Words
      </Title>
      <SimpleGrid
        breakpoints={[
          { maxWidth: 'xs', cols: 1 },
          { maxWidth: 'sm', cols: 1 },
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'lg', cols: 3 },
          { maxWidth: 'xl', cols: 4 },
          { minWidth: 'xl', cols: 5 },
        ]}
      >
        {word.related.map((re, i) => (
          <RelatedWordCard key={i} related={re} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default RelatedWordsList;
