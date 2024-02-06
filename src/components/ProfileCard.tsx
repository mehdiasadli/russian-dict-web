import {
  ActionIcon,
  Card,
  CardProps,
  Divider,
  Flex,
  Group,
  MediaQuery,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useUser } from '../store/useAuth';
import dayjs from 'dayjs';
import { IconCalendar, IconEdit, IconUser } from '@tabler/icons-react';
import { profileMenuItems } from '../resources/profileMenuItems';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import EditProfile from '../modals/EditProfile.modal';

const ProfileCard = (props?: Omit<CardProps, 'children'>) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const { pathname } = useLocation();

  return (
    <>
      <Card shadow='sm' {...props}>
        <Stack>
          <Stack spacing={5}>
            <Flex align='center' justify='space-between'>
              <Title order={3}>
                {user.firstName} {user.lastName}
              </Title>
              <Tooltip label='Edit profile'>
                <ActionIcon color='orange' size='lg' onClick={openEdit}>
                  <IconEdit size={18} />
                </ActionIcon>
              </Tooltip>
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
          <Divider />
          <SimpleGrid cols={2}>
            {/* <Card withBorder p={10}>
              <Text fz={12} color='dimmed'>
                Learning
              </Text>
              <Title order={4}>{user.learning?.length ?? 0}</Title>
            </Card> */}
            <Card withBorder p={10}>
              <Text fz={12} color='dimmed'>
                Words
              </Text>
              <Title order={4}>{user.knows?.length ?? 0}</Title>
            </Card>
          </SimpleGrid>
          <MediaQuery largerThan='md' styles={{ display: 'none' }}>
            <Divider />
          </MediaQuery>
          <MediaQuery largerThan='md' styles={{ display: 'none' }}>
            <Flex align='center' justify='center' gap={10}>
              {profileMenuItems.map((item) => (
                <Tooltip label={item.title} key={item.title}>
                  <ActionIcon
                    onClick={() => navigate(item.link)}
                    variant={item.link === pathname ? 'filled' : 'outline'}
                    color='teal'
                    size='xl'
                    w='100%'
                  >
                    {item.icon}
                  </ActionIcon>
                </Tooltip>
              ))}
            </Flex>
          </MediaQuery>
        </Stack>
      </Card>

      <EditProfile opened={editOpened} close={closeEdit} />
    </>
  );
};

export default ProfileCard;
