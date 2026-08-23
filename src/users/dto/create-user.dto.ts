import { User } from 'generated/prisma/client';

export class CreateUserDto implements Omit<User, 'id'> {
  name: string;
  age: number;
}
