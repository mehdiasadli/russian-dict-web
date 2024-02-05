import { SimpleGrid, SimpleGridProps } from '@mantine/core';

const WordGrid = (
  props: SimpleGridProps & { bps?: [number, number, number, number, number, number] }
) => {
  return (
    <SimpleGrid
      w='100%'
      breakpoints={[
        { maxWidth: 'xs', cols: props.bps?.[0] ?? 1 },
        { maxWidth: 'sm', cols: props.bps?.[1] ?? 2 },
        { maxWidth: 'md', cols: props.bps?.[2] ?? 3 },
        { maxWidth: 'lg', cols: props.bps?.[3] ?? 4 },
        { maxWidth: 'xl', cols: props.bps?.[4] ?? 5 },
        { minWidth: 'xl', cols: props.bps?.[5] ?? 6 },
      ]}
      {...props}
    >
      {props.children}
    </SimpleGrid>
  );
};

export default WordGrid;
