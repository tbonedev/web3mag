import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserReqDto } from './dto/create-user.req.dto';
import { UserResDto } from './dto/user.res.dto';
import { Uuid } from 'src/common/types/common.type';
import { GetCurrentUser } from 'src/decorators/get-current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(
    @Body() CreateUserDto: CreateUserReqDto,
  ): Promise<UserResDto> {
    return await this.userService.create(CreateUserDto);
  }

  @Get('me')
  async getCurrentUser(@GetCurrentUser() userId: Uuid): Promise<UserResDto> {
    return await this.userService.findOne(userId);
  }
  @Get(':id')
  async findUser(@Param('id', ParseUUIDPipe) id: Uuid): Promise<UserResDto> {
    return await this.userService.findOne(id);
  }

  @Delete(':id')
  async removeUser(@Param('id', ParseUUIDPipe) id: Uuid) {
    return this.userService.remove(id);
  }
}
