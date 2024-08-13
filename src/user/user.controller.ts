import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, updateUserDto } from './DTO/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create user
  @Post()
  async createUser(@Body() newUser: createUserDto) {
    return await this.userService.createUser(newUser);
  }

  // get user
  @Get('/:email')
  async getUser(@Param('email') email: string) {
    return this.userService.getUser(email);
  }

  // update user
  @Put('/:userId')
  async uptadeUser(@Param() userId: string, @Body() updateUser: updateUserDto) {
    return this.userService.updateUser(userId, updateUser);
  }
  // update user
  @Delete('/:userId')
  async deleteUser(@Param() userId: string) {
    return this.userService.deleteUser(userId);
  }
}
