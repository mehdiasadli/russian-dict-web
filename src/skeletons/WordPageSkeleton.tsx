import { Badge, Card, Divider, Flex, Group, Skeleton, Stack } from '@mantine/core';

const WordPageSkeleton = () => {
  return (
    <Card>
      <Stack>
        <Flex justify='space-between'>
          <Stack spacing={15}>
            <Flex>
              <Skeleton h={26} w={200} ta='center' />
            </Flex>
            <Group>
              <Badge variant='dot'>......</Badge>
              <Badge variant='dot'>......</Badge>
              <Badge variant='dot'>......</Badge>
            </Group>
          </Stack>
          <Group>
            <Skeleton circle h={26} w={26} radius='xl' />
            <Skeleton circle h={26} w={26} radius='xl' />
            <Skeleton circle h={26} w={26} radius='xl' />
          </Group>
        </Flex>
      </Stack>
      <Stack my={15}>
        <Divider />
        {Array.from({ length: 10 }).map(() => (
          <Stack>
            <Skeleton h={20} w='80%' />
            <Skeleton h={15} w='60%' />
          </Stack>
        ))}
      </Stack>
    </Card>
  );
};

export default WordPageSkeleton;
