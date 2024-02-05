import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Container } from '@mantine/core';

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Container my={100} mb={20} size='xl'>
        <Outlet />
      </Container>
    </>
  );
};

export default HomeLayout;
