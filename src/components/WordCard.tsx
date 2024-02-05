import { Card, CardProps, Center, Flex, Highlight, Stack, Title } from '@mantine/core';
import { useSearch } from '../store/useSearch';
import { ICommonWord } from '../resources/types';
import { Link } from 'react-router-dom';
import WordActions from './WordActions';

const WordCard = (
  props: Omit<CardProps, 'children'> & {
    item: ICommonWord;
    inner?: (node?: Element | null | undefined) => void;
    isProfile?: boolean;
  }
) => {
  const { item } = props;
  const { searchQuery } = useSearch();
  const { inner, ...rest } = props;

  return (
    <Stack align='center' spacing={0}>
      <Card
        w='100%'
        mih={100}
        key={item._id}
        withBorder
        sx={{
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          ':hover': { transform: 'scale(1.05)' },
        }}
        {...rest}
        ref={inner && typeof inner !== 'string' ? inner : undefined}
        component={Link}
        to={`/word/${item._id}`}
        py={0}
      >
        <Center h='100%' py={5}>
          <Flex direction='column' justify='flex-end'>
            <Title sx={{ letterSpacing: '2px' }} order={6} ta='center'>
              <Highlight highlight={searchQuery}>{`${item.rank}. ${item.word}`}</Highlight>
            </Title>
            <Highlight ta='center' fz={14} color='dimmed' highlight={searchQuery}>
              {item.translations.slice(0, 3).join(', ')}
            </Highlight>
          </Flex>
        </Center>
      </Card>
      <WordActions word={item} />
    </Stack>
  );
};

export default WordCard;
