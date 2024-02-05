import { Button, Card, CardProps, Stack, Text } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { profileMenuItems } from '../resources/profileMenuItems';

const ProfileMenu = (props?: Omit<CardProps, 'children'>) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Card w='min(450px, 100%)' shadow='sm' {...props}>
      <Stack>
        {profileMenuItems.map((item) => (
          <Button
            onClick={() => navigate(item.link)}
            key={item.title}
            radius='sm'
            leftIcon={item.icon}
            variant={item.link === pathname ? 'filled' : 'subtle'}
          >
            <Text>{item.title}</Text>
          </Button>
        ))}
      </Stack>
    </Card>
  );
};

export default ProfileMenu;
