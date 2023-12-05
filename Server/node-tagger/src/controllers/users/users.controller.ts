import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { MulterFile } from 'multer';
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

  @Post('save_image_tagger')
@UseInterceptors(FileInterceptor('image'))
async saveUserImageTags(
  @UploadedFile() image: MulterFile, 
  @Body('username') username: string,
  @Body('tags') tags: string,
): Promise<any> {
  try {
    console.log('Received Parameters:');
    console.log('Username:', username);
    console.log('Tags:', tags);

    if (image) {
      console.log('Image received:', image);
      const image_index_row_db = await this.databaseService.saveImage(username, image.buffer);
      const tagsValues = JSON.parse(tags);
      let elementIndex = 1;
      for (const tag of tagsValues) {
        await this.databaseService.saveImageTag(tag,image_index_row_db,elementIndex);
        elementIndex++;
      }
      return { success: true, message: 'Image tags saved successfully.' };
    } else {
      console.log('No image received.');
    }

    return { success: false, message: 'No image selected' };

  } catch (error) {
    console.error('Error processing request:', error.message);
    return { success: false, message: 'An error occurred.' };
  }
}

}
