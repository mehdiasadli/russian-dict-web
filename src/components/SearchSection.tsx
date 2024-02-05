import { ActionIcon, Flex, Stack, TextInput } from '@mantine/core';
import { IconFilter, IconKeyboard } from '@tabler/icons-react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useSearch } from '../store/useSearch';
import FilterModal from '../modals/Filter.modal';
import RussianKeyboard from './RussianKeyboard';

const SearchSection = () => {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 500);
  const { onSearchInput } = useSearch();

  const [filterModalOpened, { open: openFilterModal, close: closeFilterModal }] =
    useDisclosure(false);
  const [keyboardOpened, { toggle: toggleKeyboard }] = useDisclosure(false);

  useEffect(() => {
    onSearchInput(debounced);
  }, [debounced, onSearchInput]);

  return (
    <Stack w='100%' align='center'>
      <Flex w='min(50rem, 95%)' justify='center' gap={10} align='center'>
        <ActionIcon size='lg' color='teal' variant='outline' radius='xl' onClick={openFilterModal}>
          <IconFilter size={18} />
        </ActionIcon>
        <TextInput
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder='Search for words...'
          radius='xl'
          sx={{ flex: 1 }}
        />
        <ActionIcon size='lg' color='teal' variant='outline' radius='xl' onClick={toggleKeyboard}>
          <IconKeyboard size={18} />
        </ActionIcon>
      </Flex>

      {keyboardOpened && <RussianKeyboard setValue={setValue} />}
      <FilterModal opened={filterModalOpened} close={closeFilterModal} />
    </Stack>
  );
};

export default SearchSection;
