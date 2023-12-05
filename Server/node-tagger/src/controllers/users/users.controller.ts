import { Controller, Get, Post,Body } from '@nestjs/common';
import { DatabaseService } from '../../services/database.service';

@Controller('users')
export class UsersController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('register')
  async registerUser(@Body() body: { username: string; password: string }): Promise<boolean> {
    const { username, password } = body;
    return await this.databaseService.saveNewUser(username,password);
  }

  @Post('login')
  async loginUser(@Body() body: { username: string; password: string }): Promise<boolean> {
    const { username, password } = body;
    return await this.databaseService.login(username, password);
  }

  
  @Get()
  getHello(): string {
    return 'Hello, World! my name is yoad';
  }
}
