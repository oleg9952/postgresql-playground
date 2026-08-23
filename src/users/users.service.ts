import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly _databaseService: DatabaseService) {}

  async findAll(): Promise<User[]> {
    return this._databaseService.user.findMany();
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this._databaseService.user.create({ data: dto });
  }

  async remove(id: User['id']): Promise<void> {
    try {
      await this._databaseService.user.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }
}
