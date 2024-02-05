import { Stack } from '@mantine/core';
import SearchSection from '../components/SearchSection';
import WordsList from '../components/WordsList';

const HomePage = () => {
  return (
    <Stack align='center'>
      <SearchSection />
      <WordsList />
    </Stack>
  );
};

export default HomePage;
