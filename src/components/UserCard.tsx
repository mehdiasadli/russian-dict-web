import { ActionIcon, Card, Flex, Group, Stack, Text, Title } from '@mantine/core';
import { IUser } from '../resources/types';
import { IconCalendar, IconCrown, IconEdit, IconTrash, IconUser } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useUser } from '../store/useAuth';
import { useDisclosure } from '@mantine/hooks';
import EditProfile from '../modals/EditProfile.modal';
import UserDeleteModal from './UserDeleteModal';

const UserCard = ({ user }: { user: IUser }) => {
  const { user: currentUser } = useUser();
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  return (
    <>
      <Card
        withBorder
        sx={{
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          ':hover': { transform: 'scale(1.05)' },
        }}
      >
        <Stack>
          <Stack spacing={3}>
            <Flex align='center' justify='space-between'>
              <Title order={5}>
                {user.firstName} {user.lastName}
              </Title>
              {user.isAdmin && (
                <ActionIcon color='teal' variant='light'>
                  <IconCrown size={16} />
                </ActionIcon>
              )}
            </Flex>
            <Group spacing={5}>
              <IconUser size={14} />
              <Text color='dimmed' fz={14}>
                @{user.username}
              </Text>
            </Group>
            <Group spacing={5}>
              <IconCalendar size={14} />
              <Text color='dimmed' fz={14}>
                Joined {dayjs(user.createdAt).fromNow()}
              </Text>
            </Group>
          </Stack>
          <Card withBorder>
            <Text fz={12} color='dimmed'>
              Knows
            </Text>
            <Title order={5}>{user.knows?.length ?? 0}</Title>
          </Card>
          {(!user.isAdmin || currentUser._id === user._id) && (
            <Flex align='center' justify='flex-end' gap={10}>
              <ActionIcon color='orange' variant='light' size='lg' onClick={openEditModal}>
                <IconEdit size={16} />
              </ActionIcon>
              <ActionIcon color='red' variant='light' size='lg' onClick={openDeleteModal}>
                <IconTrash size={16} />
              </ActionIcon>
            </Flex>
          )}
        </Stack>
      </Card>

      <EditProfile opened={editModalOpened} close={closeEditModal} updateUser={user} />
      <UserDeleteModal opened={deleteModalOpened} close={closeDeleteModal} user={user} />
    </>
  );
};

export default UserCard;
