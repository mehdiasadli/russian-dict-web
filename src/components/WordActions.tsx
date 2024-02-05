import { ActionIcon, Tooltip } from '@mantine/core';
import { IconBook } from '@tabler/icons-react';
import { ICommonWord } from '../resources/types';
import { useManage } from '../services/user.service';
import { useUser } from '../store/useAuth';

const WordActions = ({ word }: { word: ICommonWord }) => {
  const { user } = useUser<false, false, false>();
  const { mutate } = useManage(user.knows.includes(word._id));

  return (
    <Tooltip
      label={
        user.knows.includes(word._id) ? 'Remove from your vocabulary' : 'Add to your vocabulary'
      }
    >
      <ActionIcon
        sx={{ borderRadius: '50% 50% 50% 50% / 0% 0% 100% 100% ' }}
        color={user.knows.includes(word._id) ? 'red' : 'teal'}
        w={50}
        variant={'light'}
        onClick={() => mutate({ id: word._id, word: word.plainWord })}
      >
        <IconBook size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

export default WordActions;
