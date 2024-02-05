import { Divider, Table, Title } from '@mantine/core';
import { IWord } from '../resources/types';

const caseNameMap = {
  a: 'Accusative',
  n: 'Nominative',
  g: 'Genitive',
  p: 'Prepositional',
  i: 'Instrumental',
  d: 'Dative',
};

const WordPageNoun = ({ word }: { word: IWord<'noun'> }) => {
  const rows =
    word.nounDeclension && Object.values(word.nounDeclension).every((v) => v.length > 0)
      ? Object.entries(word.nounDeclension).map(([caseName, data]) => {
          return (
            <tr key={caseName}>
              <td style={{ fontSize: 12 }}>{caseNameMap[caseName as keyof typeof caseNameMap]}</td>
              <td>{data[0]}</td>
              <td>{data[1]}</td>
            </tr>
          );
        })
      : null;

  return (
    rows !== null && (
      <>
        <Title order={4}>Declension</Title>
        <Table>
          <thead>
            <tr>
              <th>Case</th>
              <th>Singular</th>
              <th>Plural</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <Divider />
      </>
    )
  );
};

export default WordPageNoun;
