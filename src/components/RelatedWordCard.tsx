import { Card, Divider, Stack, Text } from '@mantine/core';
import { useFindWord } from '../services/word.service';
import { useNavigate } from 'react-router-dom';

const RelatedWordCard = ({
  related,
}: {
  related: {
    word: string;
    translation: string;
  };
}) => {
  const { data } = useFindWord(related.word);
  const navigate = useNavigate();

  return (
    <Card
      key={related.word}
      withBorder
      onClick={() => {
        if (data?.[0]?._id) {
          navigate('/word/' + data?.[0]?._id);
        }
      }}
      py={5}
      sx={{
        cursor: data?.[0]?._id ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        ':hover': { transform: 'scale(1.05)' },
      }}
    >
      <Stack ta='center' spacing={0}>
        <Text fw='bold' fz={13}>
          {related.word}
        </Text>
        <Text color='dimmed' fz={13}>
          {related.translation}
        </Text>
        {data?.[0]?._id && <Divider mt={5} color='teal' />}
      </Stack>
    </Card>
  );
};

export default RelatedWordCard;
