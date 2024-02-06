import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useUser } from '../store/useAuth';
import { useForm, zodResolver } from '@mantine/form';
import { EditUserSchema, TEditUserSchema } from '../schemas/user.schema';
import { useUpdateUser } from '../services/user.service';
import { IUser } from '../resources/types';

const EditProfile = ({
  opened,
  close,
  updateUser,
}: {
  opened: boolean;
  close: () => void;
  updateUser?: IUser;
}) => {
  const { user: currentUser } = useUser();
  const user = updateUser ?? currentUser;

  const form = useForm<TEditUserSchema>({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    validate: zodResolver(EditUserSchema),
  });
  const { mutate, isPending } = useUpdateUser(close, updateUser);

  const onSuccess = (values: TEditUserSchema) => {
    mutate(values);
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
      <form onSubmit={form.onSubmit(onSuccess)}>
        <Stack>
          <TextInput
            label='First name'
            placeholder='First name'
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label='Last name'
            placeholder='Last name'
            {...form.getInputProps('lastName')}
          />
          <TextInput
            label='Username'
            description='Username cannot be updated'
            readOnly
            disabled
            value={user.username}
          />
          <Button loading={isPending} disabled={!form.isDirty()} type='submit'>
            Update
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditProfile;
