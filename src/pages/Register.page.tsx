import { useForm, zodResolver } from '@mantine/form';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { RegisterSchema, TRegisterSchema } from '../schemas/user.schema';
import { useRegister } from '../services/user.service';

const RegisterPage = () => {
  const form = useForm<TRegisterSchema>({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
    },
    validate: zodResolver(RegisterSchema),
    transformValues(values) {
      const firstName =
        values.firstName.trim()[0].toUpperCase() + values.firstName.trim().substring(1);
      const lastName =
        values.lastName.trim()[0].toUpperCase() + values.lastName.trim().substring(1);

      return {
        firstName,
        lastName,
        username: values.username.trim().toLowerCase(),
        password: values.password.trim(),
      };
    },
  });
  const { mutate, isPending } = useRegister();

  const onSuccess = (values: TRegisterSchema) => {
    mutate(values);
  };

  return (
    <form onSubmit={form.onSubmit(onSuccess)}>
      <Stack>
        <TextInput
          label='Username'
          placeholder='Enter your username'
          {...form.getInputProps('username')}
        />
        <TextInput
          label='First name'
          placeholder='Enter your first name'
          {...form.getInputProps('firstName')}
        />
        <TextInput
          label='Last name'
          placeholder='Enter your last name'
          {...form.getInputProps('lastName')}
        />
        <PasswordInput
          label='Password'
          placeholder='Enter your password'
          {...form.getInputProps('password')}
        />
        <Button
          loading={isPending}
          disabled={!Object.values(form.values).every((val) => val !== '')}
          type='submit'
        >
          Register
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterPage;
