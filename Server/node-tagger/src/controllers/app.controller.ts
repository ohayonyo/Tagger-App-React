import { Controller, Get ,Post,Body} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<User> {
    return this.appService.createUser("yoad","123");
  }

  @Post('register')
  async registerUser(@Body() body: { username: string; password: string }): Promise<User> {
    const { username, password } = body;
    const user:User = await this.appService.getUserByUsername(username);
    if(!user)
      return this.appService.createUser(username,password);
    return null;
  }
  
}
