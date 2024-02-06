import { Button, Flex, Modal, Stack, Title } from '@mantine/core';
import { IUser } from '../resources/types';
import { useDeleteUser } from '../services/user.service';

const UserDeleteModal = ({
  opened,
  close,
  user,
}: {
  opened: boolean;
  close: () => void;
  user: IUser;
}) => {
  const { mutate, isPending } = useDeleteUser(close);

  const onDelete = () => {
    mutate({ id: user._id, name: user.firstName + ' ' + user.lastName });
  };

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
        <Title order={4}>Do you want to delete this user?</Title>
        <Flex justify='flex-end' gap={10}>
          <Button
            color='gray'
            onClick={() => {
              close();
            }}
          >
            Cancel
          </Button>
          <Button color='red' onClick={onDelete} loading={isPending}>
            Delete
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};

export default UserDeleteModal;
