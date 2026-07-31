import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): User[] {
    return this.databaseService.read<User>();
  }

  create(dto: CreateUserDto): User {
    const users = this.databaseService.read<User>();
    const nextId = users.reduce((max, u) => Math.max(max, u.id), 0) + 1;
    const user: User = { id: nextId, ...dto };
    users.push(user);
    this.databaseService.write(users);
    return user;
  }

  remove(id: number): void {
    const users = this.databaseService.read<User>();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    users.splice(index, 1);
    this.databaseService.write(users);
  }
}
