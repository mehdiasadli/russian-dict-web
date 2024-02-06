import { Card, Loader, SimpleGrid, Title } from '@mantine/core';
import { useUsers } from '../services/user.service';
import UserCard from '../components/UserCard';

const Dashboard = () => {
  const { data, isLoading, isError } = useUsers();

  if (isError) {
    return (
      <Card withBorder w='100%'>
        <Title order={4} color='red' ta='center'>
          Error happened while fetching users. Try again.
        </Title>
      </Card>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  const content = data?.map((user) => {
    return <UserCard key={user._id} user={user} />;
  });

  return !content ? (
    <Card withBorder w='100%'>
      <Title order={4} ta='center'>
        No user found
      </Title>
    </Card>
  ) : (
    <SimpleGrid
      breakpoints={[
        { maxWidth: 'xs', cols: 1 },
        { maxWidth: 'sm', cols: 2 },
        { maxWidth: 'md', cols: 3 },
        { maxWidth: 'lg', cols: 3 },
        { maxWidth: 'xl', cols: 4 },
        { minWidth: 'xl', cols: 5 },
      ]}
    >
      {content}
    </SimpleGrid>
  );
};

export default Dashboard;
