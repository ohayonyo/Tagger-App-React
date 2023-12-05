import { Controller, Get, Post,Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post('register')
  registerUser(@Body() body: { username: string; password: string }): string {
    // Implement user registration logic here
    const { username, password } = body;
    return `User registered with username: ${username}, password: ${password}`;
  }

  @Get()
  getHello(): string {
    return 'Hello, World! my name is yoad';
  }
}
