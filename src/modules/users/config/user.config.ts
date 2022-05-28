import { registerAs } from '@nestjs/config';

export default registerAs('users', () => ({
  forbiddenUser: process.env.FORBIDDEN_USER,
}));
