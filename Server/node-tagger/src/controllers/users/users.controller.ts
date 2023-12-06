import { Controller, Post, Get, Param, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { MulterFile } from 'multer';
import { DatabaseService } from '../../services/database.service';
import { ImageData } from '../../services/database.service';

export interface ImageResponse {
  success: boolean;
  data?: ImageData[]; // ImageData is the structure you defined before
  message?: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly databaseService: DatabaseService) {}

  onModuleDestroy() {
    // Close the database connection when the NestJS module is destroyed
    this.databaseService.closeConnection();
  }

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

@Get(':username/images')
  async getImagesOfUser(@Param('username') username: string): Promise<ImageResponse> {
    try {
      console.log('in get images of user:',username);
      const imageRows = await this.databaseService.getImagesOfUser(username);

      const image_data = imageRows.map(row => {
        return {
          image_index: row.image_index,
          image: row.image,
        };
      });

      return { success: true, data: image_data };
    } catch (error) {
      console.error('Error processing request:', error.message);
      return { success: false, message: 'An error occurred.' };
    }
  }

}
