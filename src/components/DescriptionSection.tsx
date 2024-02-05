import { ICommonWord } from '../resources/types';
import { Text, Title } from '@mantine/core';

const DescriptionSection = ({ word }: { word: ICommonWord }) => {
  return !word.description ? null : (
    <>
      <Title order={4} color='dimmed'>
        Description
      </Title>
      <Text>{word.description}</Text>
    </>
  );
};

export default DescriptionSection;
