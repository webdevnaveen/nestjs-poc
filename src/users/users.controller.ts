import { Controller, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('role')
  updateRole(@Body() body: { userId: number; role: string }) {
    return this.usersService.updateUserRole(body.userId, body.role);
  }
}