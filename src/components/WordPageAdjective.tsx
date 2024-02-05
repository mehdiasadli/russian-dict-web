import { Divider, Group, Stack, Table, Title } from '@mantine/core';
import { IWord } from '../resources/types';

const shortFormMap = {
  m: 'Masculine',
  f: 'Feminine',
  n: 'Neuter',
  p: 'Plural',
};

const WordPageAdjective = ({ word }: { word: IWord<'adjective'> }) => {
  const rows =
    word.shortForms && Object.values(word.shortForms).every((v) => v)
      ? Object.entries(word.shortForms).map(([sn, data]) => {
          return (
            <tr key={sn}>
              <td style={{ fontSize: 12 }}>{shortFormMap[sn as keyof typeof shortFormMap]}</td>
              <td>{data}</td>
            </tr>
          );
        })
      : null;

  const degRows =
    word.degrees && Object.values(word.degrees).every((v) => v)
      ? Object.entries(word.degrees).map(([dn, data]) => {
          return (
            <tr key={dn}>
              <td style={{ fontSize: 12 }}>{dn}</td>
              <td>{data}</td>
            </tr>
          );
        })
      : null;

  return (
    (rows !== null || degRows !== null) && (
      <>
        <Group spacing={50} align='flex-start'>
          {rows !== null && (
            <Stack>
              <Title order={4}>Short Forms</Title>
              <Table>
                <tbody>{rows}</tbody>
              </Table>
            </Stack>
          )}
          {degRows !== null && (
            <Stack>
              <Title order={4}>Degrees</Title>
              <Table>
                <tbody>{degRows}</tbody>
              </Table>
            </Stack>
          )}
        </Group>
        <Divider />
      </>
    )
  );
};

export default WordPageAdjective;
