import { Controller, Get ,Post,Body,UseInterceptors,UploadedFile,Param, Delete} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { User } from 'src/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { MulterFile } from 'multer';
import { ImageDataType } from '../services/app.service';
import { RectanglesTags } from '../services/app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  async registerUser(@Body() body: { username: string; password: string }): Promise<User> {
    const { username, password } = body;
    const user:User = await this.appService.getUserByUsername(username);
    if(!user)
      return this.appService.createUser(username,password);
    return null;
  }

  @Post('login')
  async loginUser(@Body() body: { username: string; password: string }): Promise<{success:boolean,message:string}> {
    const { username, password } = body;
    return await this.appService.login(username, password);
  }

  @Post('save_image_tagger')
  @UseInterceptors(FileInterceptor('image'))
  async saveUserImageTags(
    @UploadedFile() image: MulterFile, 
    @Body('username') username: string,
    @Body('tags') tags: string,
  ): Promise<{success:boolean,message:string}> {
    return this.appService.saveUserImageTags(username,image,tags);
  }

  @Get(':username/images')
  async getImagesOfUser(@Param('username') username: string): Promise<{success:boolean; data:ImageDataType[]|null}> {
    const image_data = await this.appService.getImagesOfUser(username);
    return { success: true, data: image_data };
  }

  @Get(':image_index/image_tags')
  async getImageTags(@Param('image_index') image_index: number):Promise<{image_index:number;tags:RectanglesTags[]}> {
      return await this.appService.getImageTags(image_index);
  }

  @Delete('deleteImage/:index')
  async deleteImage(@Param('index') index: number){
    return await this.appService.deleteImage(index);
  }

}
