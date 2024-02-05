import { TypeOf, z } from 'zod';

export const RegisterSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2, 'First name must be larger than 2 characters')
    .regex(/^[a-zA-ZöğıəçşüÖĞIƏÇŞÜ-]+$/, 'Name can only include letters and hyphen'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(2, 'Last name must be larger than 2 characters')
    .regex(/^[a-zA-ZöğıəçşüÖĞIƏÇŞÜ-]+$/, 'Name can only include letters and hyphen'),
  username: z
    .string({ required_error: 'Username is required' })
    .min(4, 'Username must be larger than 4 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only include alphanumerical characters and underscore'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(4, 'Password must be larger than 4 characters')
    .regex(/^\S+$/, 'Password can not include blank spaces'),
});

export const EditUserSchema = z.object({
  firstName: z.optional(
    z
      .string({ required_error: 'First name is required' })
      .min(2, 'First name must be larger than 2 characters')
      .regex(/^[a-zA-ZöğıəçşüÖĞIƏÇŞÜ-]+$/, 'Name can only include letters and hyphen')
  ),
  lastName: z.optional(
    z
      .string({ required_error: 'Last name is required' })
      .min(2, 'Last name must be larger than 2 characters')
      .regex(/^[a-zA-ZöğıəçşüÖĞIƏÇŞÜ-]+$/, 'Name can only include letters and hyphen')
  ),
});

export type TRegisterSchema = TypeOf<typeof RegisterSchema>;
export type TEditUserSchema = TypeOf<typeof EditUserSchema>;
