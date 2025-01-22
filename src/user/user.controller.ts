// user/user.controller.ts
import { Controller, Post, Body, Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string, name: string }) {
    const { username, password, name } = body;

    await this.userService.validateUserData(username, password, name);

    const userId = await this.userService.createUser(username, password, name);
    Logger.log("Created new user", userId)
    return { id: userId };
  }
}