// user/user.controller.ts
import { Controller, Post, Body, Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    Logger.log("Attempted creating user")
    const userId = await this.userService.createUser(username, password);
    Logger.log("Created new user", userId)
    return { id: userId };
  }
}