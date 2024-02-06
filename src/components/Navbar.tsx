import { ActionIcon, Card, Center, Flex, MantineColor } from '@mantine/core';
import {
  IconDashboard,
  IconHome,
  IconLogout,
  IconMoon,
  IconSun,
  IconUser,
} from '@tabler/icons-react';
import { glassify } from '../resources/glass';
import { useUser } from '../store/useAuth';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { usePreferences } from '../store/usePreferences';

type NavL = {
  title: string;
  onClick: () => void;
  color?: MantineColor;
  icon: React.ReactElement;
  adminOnly?: boolean;
};

const Navbar = () => {
  const { logout, user } = useUser();
  const { scheme, toggle } = usePreferences();
  const navigate = useNavigate();

  const navs: NavL[] = useMemo(
    () => [
      {
        title: 'Home',
        icon: <IconHome size={18} />,
        onClick: () => {
          navigate('/');
        },
      },
      {
        title: 'Profile',
        icon: <IconUser size={18} />,
        onClick: () => {
          navigate('/profile');
        },
      },
      {
        title: 'Dashboard',
        icon: <IconDashboard size={18} />,
        adminOnly: true,
        onClick: () => {
          navigate('/dashboard');
        },
      },
      {
        title: 'Color Scheme',
        icon: scheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />,
        color: scheme === 'dark' ? 'yellow' : 'gray.8',
        onClick: toggle,
      },
      {
        title: 'Logout',
        icon: <IconLogout size={18} />,
        color: 'red',
        onClick: logout,
      },
    ],
    [logout, scheme, toggle, navigate]
  );

  return (
    <Center h={55} py={10} pos='fixed' left={0} top={5} right={0} sx={{ zIndex: 20 }}>
      <Card
        maw='95%'
        radius='xl'
        py={5}
        px={20}
        withBorder
        sx={{
          ...glassify(scheme, {
            shadow: {
              styles: '0 1px 4px',
            },
          }),
        }}
      >
        <Flex align='center' justify='center' gap={10}>
          {navs
            .filter((nav) => (!nav.adminOnly ? true : user.isAdmin))
            .map((nav) => (
              <ActionIcon
                key={nav.title}
                variant='subtle'
                color={nav.color ?? 'teal'}
                size='lg'
                onClick={nav.onClick}
              >
                {nav.icon}
              </ActionIcon>
            ))}
        </Flex>
      </Card>
    </Center>
  );
};

export default Navbar;
