import { TypeOf, z } from 'zod';

export const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is requried'),
});

export type TLoginSchema = TypeOf<typeof LoginSchema>;
