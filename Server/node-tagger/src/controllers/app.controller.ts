import { Controller, Get ,Post,Body,UseInterceptors,UploadedFile} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { User } from 'src/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { MulterFile } from 'multer';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): Promise<User> {
  //   return this.appService.createUser("yoad","123");
  // }

  @Post('register')
  async registerUser(@Body() body: { username: string; password: string }): Promise<User> {
    const { username, password } = body;
    const user:User = await this.appService.getUserByUsername(username);
    if(!user)
      return this.appService.createUser(username,password);
    return null;
  }

  @Post('login')
  async loginUser(@Body() body: { username: string; password: string }): Promise<{success:boolean,value:string}> {
    const { username, password } = body;
    return await this.appService.login(username, password);
  }

  @Post('save_image_tagger')
  @UseInterceptors(FileInterceptor('image'))
  async saveUserImageTags(
    @UploadedFile() image: MulterFile, 
    @Body('username') username: string,
    @Body('tags') tags: string,
  ): Promise<any> {
    return this.appService.saveUserImageTags(username,image,tags);

  }

}
