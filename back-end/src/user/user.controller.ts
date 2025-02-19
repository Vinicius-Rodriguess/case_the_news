import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user/:email')
  getUser(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }
}
