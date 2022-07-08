import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';

import { CurrentAccountId } from '../../common/decorators/current-user-auth.decorator';
import JwtAuthenticationGuard from '../account/guard/jwtAuthenticationGuard';
import { ForbiddenUser } from './decorators/forbidden-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { OutputUserDto } from './dto/output-user.dto';
import { HttpUsersService } from './http-users.service';

@Swagger.ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly httpUsersService: HttpUsersService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@CurrentAccountId() accountId: number, @Body() createUserDto: CreateUserDto): Promise<OutputUserDto> {
    return this.httpUsersService.create(accountId, createUserDto);
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
  @UseGuards(JwtAuthenticationGuard)
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
  @UseGuards(JwtAuthenticationGuard)
  async findOne(@Param('id') id: number): Promise<OutputUserDto> {
    return await this.httpUsersService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string): Promise<boolean> {
    return this.httpUsersService.remove(+id);
  }

  @ForbiddenUser()
  @UseGuards(JwtAuthenticationGuard)
  @Get('user/me')
  @UseGuards(JwtAuthenticationGuard)
  getMe(@CurrentUserAuth('id') userId: number): Promise<OutputMeUserDto> {
    console.log('CurrentUserAuth', userId);
    return this.httpUsersService.getMe(userId || 1);
  }
}
