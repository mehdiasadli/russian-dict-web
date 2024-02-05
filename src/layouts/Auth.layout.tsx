import { Anchor, Card, Center, Group, Stack, Text, Title } from '@mantine/core';
import { Link, Outlet, useMatch } from 'react-router-dom';

function Footer({ title, link, linkLabel }: { title: string; link: string; linkLabel: string }) {
  return (
    <Group spacing={5}>
      <Text color='dimmed'>{title}</Text>
      <Anchor component={Link} to={'/auth/' + link}>
        {linkLabel}
      </Anchor>
    </Group>
  );
}

const AuthLayout = () => {
  const isLoginPage = useMatch('/auth/login');

  return (
    <Center h='100vh'>
      <Stack align='center'>
        <Title order={2}>{isLoginPage ? 'Sign in to your account' : 'Create a new account'}</Title>
        <Card radius='md' shadow='xs' w='min(30rem, 95vw)'>
          <Outlet />
        </Card>
        {isLoginPage ? (
          <Footer title="Don't have an account?" link='register' linkLabel='Sign up' />
        ) : (
          <Footer title='Already have an account?' link='login' linkLabel='Sign in' />
        )}
      </Stack>
    </Center>
  );
};

export default AuthLayout;
