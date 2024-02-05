import { Card, Center, Loader, Stack, Title } from '@mantine/core';
import { useWords } from '../services/word.service';
import WordListSkeleton from './WordListSkeleton';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import WordCard from './WordCard';
import WordGrid from './WordGrid';
import { useUser } from '../store/useAuth';

const WordsList = ({
  isProfile,
  packet,
  userId,
}: {
  isProfile?: boolean;
  packet?: 'learning' | 'knows';
  userId?: string;
}) => {
  const { user } = useUser();
  const { data, isError, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useWords({
    packet,
    user: userId ?? user._id,
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) {
    return (
      <Card withBorder w='100%'>
        <Title order={4} color='red' ta='center'>
          Error happened while fetching words. Try again.
        </Title>
      </Card>
    );
  }

  if (isLoading) {
    return <WordListSkeleton />;
  }

  const results = data?.pages.map((page) => page.result).flat();
  const content = results?.map((item, index) => {
    return (
      <WordCard
        key={index}
        item={item}
        isProfile={isProfile}
        {...(results?.length === index + 1 ? { inner: ref } : {})}
      />
    );
  });

  return !data || !data.pages || data.pages.length === 0 || data.pages?.[0].result.length === 0 ? (
    <Card withBorder w='80%' mx='auto'>
      <Title order={4} ta='center'>
        No words found here...
      </Title>
    </Card>
  ) : (
    <Stack py={5}>
      <WordGrid bps={isProfile ? [1, 2, 3, 3, 4, 4] : undefined}>{content}</WordGrid>
      {isFetchingNextPage && (
        <Center my={5}>
          <Loader variant='bars' size='sm' />
        </Center>
      )}
    </Stack>
  );
};

export default WordsList;
