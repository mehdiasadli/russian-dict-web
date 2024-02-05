import { Badge, Group, MantineColor } from '@mantine/core';
import { Aspect, Gender, IAdj, ICommonWord, INoun, IVerb, POS } from '../resources/types';
import { useNavigate } from 'react-router-dom';
import { useWordLink } from '../hooks/useWordLink';

const verbalAspectColorMap: Record<Aspect, MantineColor> = {
  perfective: 'blue',
  imperfective: 'cyan',
  'perfective & imperfective': 'indigo',
  other: 'gray',
};
const genderColorMap: Record<Gender, MantineColor> = {
  masculine: 'blue',
  feminine: 'violet',
  neuter: 'cyan',
  other: 'gray',
};

const InfoOverall = ({ word, pos }: { word: ICommonWord; pos: POS }) => {
  const { data } = useWordLink(word);
  const navigate = useNavigate();

  return (
    <Group spacing={5}>
      <Badge variant='dot' size='sm'>
        {pos}
      </Badge>
      {pos === 'noun' ? (
        <>
          <Badge variant='dot' size='sm' color={genderColorMap[word.gender as Gender]}>
            {(word as INoun).gender}
          </Badge>
          <Badge variant='dot' size='sm' color={word.isAnimate ? 'cyan' : 'blue'}>
            {(word as INoun).isAnimate ? 'Animate' : 'Inanimate'}
          </Badge>
          {(word as INoun).nounPartner && (
            <Badge
              variant='outline'
              size='sm'
              onClick={() => {
                if (data?.[0]?._id) {
                  navigate('/word/' + data?.[0]?._id);
                }
              }}
              sx={{ cursor: data?.[0]?._id ? 'pointer' : 'default' }}
            >
              {(word as INoun).nounPartner}
            </Badge>
          )}
        </>
      ) : pos === 'adjective' ? (
        (word as IAdj).adverbPartner && (
          <Badge
            variant='outline'
            size='sm'
            onClick={() => {
              if (data?.[0]?._id) {
                navigate('/word/' + data?.[0]?._id);
              }
            }}
            sx={{ cursor: data?.[0]?._id ? 'pointer' : 'default' }}
          >
            {(word as IAdj).adverbPartner}
          </Badge>
        )
      ) : pos === 'verb' ? (
        <>
          <Badge variant='dot' size='sm' color={verbalAspectColorMap[word.verbalAspect as Aspect]}>
            {(word as IVerb).verbalAspect}
          </Badge>
          {(word as IVerb).aspectPair && (
            <Badge variant='outline' size='sm'>
              {(word as IVerb).aspectPair.map((p, i) => (
                <span
                  key={i}
                  onClick={() => {
                    const id = data?.find((w) => w.word === p)?._id;

                    if (id) {
                      navigate('/word/' + id);
                    }
                  }}
                  style={{
                    cursor: data?.find((w) => w.word === p)?._id ? 'pointer' : 'default',
                  }}
                >
                  {p}
                  {word.aspectPair?.length !== i + 1 ? ', ' : ''}
                </span>
              ))}
            </Badge>
          )}
        </>
      ) : null}
    </Group>
  );
};

export default InfoOverall;
