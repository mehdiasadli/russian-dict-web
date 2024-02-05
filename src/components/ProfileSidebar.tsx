import { MediaQuery, Stack, StackProps } from '@mantine/core';
import ProfileCard from './ProfileCard';
import ProfileMenu from './ProfileMenu';

const ProfileSidebar = (props?: Omit<StackProps, 'children'>) => {
  return (
    <Stack {...props}>
      <ProfileCard />
      <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
        <ProfileMenu />
      </MediaQuery>
    </Stack>
  );
};

export default ProfileSidebar;
