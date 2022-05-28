import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';

import { CurrentUserAuth } from '../../common/decorators/current-user-auth.decorator';
import { ForbiddenUser } from './decorators/forbidden-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { OutputMeUserDto } from './dto/output-me-user.dto';
import { OutputUserDto } from './dto/output-user.dto';
import { HttpUsersService } from './http-users.service';

@Swagger.ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly httpUsersService: HttpUsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<OutputUserDto> {
    return this.httpUsersService.create(createUserDto);
  }

  @Swagger.ApiOkResponse({
    description: 'Return collection users',
    type: OutputUserDto,
  })
  @Swagger.ApiNotFoundResponse({
    description: 'No one Users found',
  })
  @Swagger.ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  findAll(): Promise<OutputUserDto[]> {
    return this.httpUsersService.findAll();
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
    return await this.httpUsersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.httpUsersService.remove(+id);
  }

  @ForbiddenUser()
  @Get('user/me')
  getMe(@CurrentUserAuth('id') userId: number): Promise<OutputMeUserDto> {
    console.log('CurrentUserAuth', userId);
    return this.httpUsersService.getMe(userId || 1);
  }
}
