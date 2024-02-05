import { Card, Skeleton, Stack } from '@mantine/core';
import WordGrid from './WordGrid';

const WordListSkeleton = () => {
  return (
    <Stack py={5} w='100%'>
      <WordGrid>
        {Array.from({ length: 50 }).map((_, i) => (
          <Card key={i} withBorder w='100%'>
            <Stack align='center' spacing={8} w='100%'>
              <Skeleton w={'50%'}  height={16} ta='center' />
              <Stack spacing={2} w='100%' align='center'>
                <Skeleton w={'80%'}  height={8} ta='center' />
                <Skeleton w={'30%'}  height={8} ta='center' />
              </Stack>
            </Stack>
          </Card>
        ))}
      </WordGrid>
    </Stack>
  );
};

export default WordListSkeleton;
