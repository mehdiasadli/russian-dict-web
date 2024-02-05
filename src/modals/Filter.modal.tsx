import { Modal, SegmentedControl, Select, Stack, Text } from '@mantine/core';
import { useSearch } from '../store/useSearch';
import { POS } from '../resources/types';

const FilterModal = ({ opened, close }: { opened: boolean; close: () => void }) => {
  const { limit, pos, dir, sortBy, changeDir, changeLimit, changeSortBy, changePos } = useSearch();

  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={false}
      centered
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
    >
      <Stack>
        <Select
          data={['20', '50', '100']}
          placeholder='Select limit'
          label='Limit'
          value={String(limit)}
          onChange={(value) => changeLimit(!value ? 50 : +value)}
        />
        <Stack spacing={5} ta='center' fz={14} fw='bold'>
          <Text>Part of Speech</Text>
          <SegmentedControl
            data={[
              { label: 'All', value: 'all' },
              { label: 'Verb', value: 'verb' },
              { label: 'Noun', value: 'noun' },
              { label: 'Adjective', value: 'adjective' },
              { label: 'Other', value: 'other' },
            ]}
            value={pos ?? 'all'}
            onChange={(val) => changePos(val as 'all' | POS)}
          />
        </Stack>
        <Stack spacing={5} ta='center' fz={14} fw='bold'>
          <Text>Sort by</Text>
          <SegmentedControl
            data={[
              { label: 'Alphabetical order', value: 'abc' },
              { label: 'Frequency', value: 'rank' },
            ]}
            value={sortBy}
            onChange={(val) => changeSortBy(val as 'rank' | 'abc')}
          />
        </Stack>
        <Stack spacing={5} ta='center' fz={14} fw='bold'>
          <Text>Sort Direction</Text>
          <SegmentedControl
            data={[
              { label: 'Ascending', value: 'asc' },
              { label: 'Descending', value: 'desc' },
            ]}
            value={dir}
            onChange={(val) => changeDir(val as 'asc' | 'desc')}
          />
        </Stack>
      </Stack>
    </Modal>
  );
};

export default FilterModal;
