import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';
import { EntityNotFoundException } from 'src/common/exceptions/entity-not-found.exception';

import { CreateUserDto } from './dto/create-user.dto';
import { OutputUserDto } from './dto/output-user.dto';
import { UsersService } from './users.service';

@Swagger.ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Swagger.ApiOkResponse({
    description: 'Return collection users',
    type: OutputUserDto,
  })
  @Get()
  findAll(): Promise<OutputUserDto[]> {
    return this.usersService.findAll();
  }

  @Swagger.ApiOkResponse({
    description: 'Return public user',
    type: OutputUserDto,
  })
  @Swagger.ApiNotFoundResponse({
    description: 'User not found',
  })
  @Swagger.ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<OutputUserDto> {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      if (error instanceof EntityNotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // TODO: refactor before adding @GetCurrentUser()
  @Get('me/:id')
  getMe(@Param('id') id: number): Promise<OutputUserDto> {
    return this.usersService.getMe(id);
  }
}
