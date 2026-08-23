import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: User['id']) {
    return this.usersService.remove(id);
  }
}
