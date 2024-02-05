import { Card, Flex, Stack } from '@mantine/core';
import ProfileSidebar from '../components/ProfileSidebar';
import { Outlet } from 'react-router-dom';
import SearchSection from '../components/SearchSection';

const ProfilePage = () => {
  return (
    <Flex gap={20} sx={(theme) => ({ [theme.fn.smallerThan('md')]: { flexDirection: 'column' } })}>
      <ProfileSidebar sx={{ flex: 0.3 }} />
      <Card shadow='xs' sx={{ flex: 0.7 }}>
        <Stack>
          <SearchSection />
          <Outlet />
        </Stack>
      </Card>
    </Flex>
  );
};

export default ProfilePage;
