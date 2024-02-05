import { Divider, SimpleGrid, Stack, Table, Title } from '@mantine/core';
import { IWord } from '../resources/types';

const presentMap = {
  fps: 'Я',
  sps: 'Ты',
  tpp: 'Они',
};
const futureMap = {
  fps: 'буду',
  sps: 'будешь',
  tpp: 'будет',
};

const pastMap = {
  m: 'Masculine',
  f: 'Feminine',
  n: 'Neuter',
  p: 'Plural',
};

const imperativeMap = {
  s: 'Ты',
  p: 'Вы',
};

const participleMap = {
  active_present: 'Active present',
  active_past: 'Active past',
  passive_present: 'Passive present',
  passive_past: 'Passive past',
  gerund_present: 'Gerund present',
  gerund_past: 'Gerund past',
};

const participleDesc = {
  active_present: 'Someone who is doing / Someone who does',
  active_past: 'Someone who has done / Someone who did',
  passive_present: 'Something which is done / Something which is being done',
  passive_past: 'Something which was done / Something which has been done',
  gerund_present: 'While doing [present]',
  gerund_past: 'While doing [past]',
};

const WordPageVerb = ({ word }: { word: IWord }) => {
  const isPerfective = word.verbalAspect === 'perfective';

  const presentRows = word.verbConjugation?.present
    ? Object.entries(word.verbConjugation.present).map(([name, data]) => {
        return (
          <tr key={name}>
            <td>{presentMap[name as keyof typeof presentMap]}</td>
            <td>{isPerfective ? '-' : data}</td>
            <td>
              {isPerfective ? data : futureMap[name as keyof typeof futureMap] + ' ' + word.word}
            </td>
          </tr>
        );
      })
    : null;

  const pastRows = word.verbConjugation?.past
    ? Object.entries(word.verbConjugation.past).map(([name, data]) => {
        return (
          <tr key={name}>
            <td style={{ fontSize: 12 }}>{pastMap[name as keyof typeof pastMap]}</td>
            <td>{data}</td>
          </tr>
        );
      })
    : null;

  const imperativeRows = word.imperativeMood
    ? Object.entries(word.imperativeMood).map(([name, data]) => {
        return (
          <tr key={name}>
            <td style={{ fontSize: 12 }}>{imperativeMap[name as keyof typeof imperativeMap]}</td>
            <td>{data}</td>
          </tr>
        );
      })
    : null;

  const participleRows = word.verbParticiples
    ? Object.entries(word.verbParticiples).map(([name, data]) => {
        return (
          <tr key={name}>
            <td>{participleMap[name as keyof typeof participleMap]}</td>
            <td>{data}</td>
            <td>{participleDesc[name as keyof typeof participleDesc]}</td>
          </tr>
        );
      })
    : null;

  return (
    <>
      <Stack>
        <SimpleGrid
          spacing={50}
          breakpoints={[
            { maxWidth: 'sm', cols: 1 },
            { maxWidth: 'lg', cols: 2 },
            { minWidth: 'lg', cols: 3 },
          ]}
        >
          {presentRows !== null && (
            <Stack>
              <Title ta='center' order={4}>
                Conjugation
              </Title>
              <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Present</th>
                    <th>Future</th>
                  </tr>
                </thead>
                <tbody>{presentRows}</tbody>
              </Table>
            </Stack>
          )}
          {pastRows !== null && (
            <Stack>
              <Title ta='center' order={4}>
                Past Tense
              </Title>
              <Table>
                <tbody>{pastRows}</tbody>
              </Table>
            </Stack>
          )}
          {imperativeRows !== null && (
            <Stack>
              <Title ta='center' order={4}>
                Imperative Mood
              </Title>
              <Table>
                <tbody>{imperativeRows}</tbody>
              </Table>
            </Stack>
          )}
        </SimpleGrid>
        {participleRows !== null && (
          <Stack>
            <Title order={4}>Participles</Title>
            <Table>
              <tbody>{participleRows}</tbody>
            </Table>
          </Stack>
        )}
      </Stack>
      <Divider />
    </>
  );
};

export default WordPageVerb;
