import { useForm, zodResolver } from '@mantine/form';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { LoginSchema, TLoginSchema } from '../schemas/auth.schema';
import { useLogin } from '../services/auth.service';

const LoginPage = () => {
  const form = useForm<TLoginSchema>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: zodResolver(LoginSchema),
    transformValues(values) {
      return {
        username: values.username.trim().toLowerCase(),
        password: values.password.trim(),
      };
    },
  });
  const { mutate, isPending } = useLogin();

  const onSuccess = (values: TLoginSchema) => {
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
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default LoginPage;
