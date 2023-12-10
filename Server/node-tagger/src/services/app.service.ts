import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity';
import {Repository} from 'typeorm'
import { MulterFile } from 'multer';
import { Image } from 'src/entities/image.entity';
import { ImageTag } from 'src/entities/imageTag.entity';

import * as base64 from 'base64-js';

type TagWithCoordinates = {
  startX:number;
  startY:number;
  endX:number;
  endY:number;
  tag: string;
}

type RectanglesTags = {
  top:number;
  left:number;
  width:number;
  height:number;
  tag:string;
}

export type ImageDataType = {
  image_index: number;
  image: string; // Assuming this is a base64-encoded string
}

const WIDTH_RATIO = 0.355;
const HEIGHT_RATIO = 0.5833;

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository:Repository<User>,
    @InjectRepository(Image) private imagesRepository:Repository<Image>,
    @InjectRepository(ImageTag) private imageTagsRepository:Repository<ImageTag>,
  ){}

  getAllUsers():Promise<User[]>{
    return this.usersRepository.find();
  }

  async getUserByUsername(username:string):Promise<User>{
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });
    return user
  }

  async createUser(username: string, password: string): Promise<User> {
    const newUser = this.usersRepository.create({
      username,
      password,
    });
  
    newUser.my_images = [];
    newUser.is_active = false;

    return this.usersRepository.save(newUser);
  }

  async login(username: string, password: string): Promise<{success:boolean,message:string}> {
    const user = await this.usersRepository.findOne({
      where: { username},
    });

    if(!user){
      return {success:false,message:"Username doesn't exists"}
    }

    if(user.password!==password){
      return {success:false,message:'Wrong password'};
    }
  
    await this.usersRepository.update({ username, password }, { is_active: true });
    return {success:true, message:username+' logged in successfully'};
  }


  convertTagsFormat(imageTagsData:TagWithCoordinates[],imageIndex:number):{image_index:number;tags:RectanglesTags[]}{
    console.log('in convert tags:');
    const tags = imageTagsData.map((tagWithCoordinates)=>{
      const top = Math.min(tagWithCoordinates.startY,tagWithCoordinates.endY) * HEIGHT_RATIO;
      const left = Math.min(tagWithCoordinates.startX,tagWithCoordinates.endX) * WIDTH_RATIO;
      const width = Math.abs(tagWithCoordinates.endX-tagWithCoordinates.startX) * WIDTH_RATIO;
      const height = Math.abs(tagWithCoordinates.endY - tagWithCoordinates.startY) * HEIGHT_RATIO;
      return {
        top:top,
        left:left,
        width:width,
        height:height,
        tag:tagWithCoordinates.tag
      }
    }) || [];

    return {image_index:imageIndex,tags:tags}
  }


  async saveUserImageTags(username: string, image: MulterFile, tags: string) {
    const user = await this.getUserByUsername(username);

    if (!image || !image.buffer)
      return { success: false, message: 'Image is not valid or not exists' };
    

    const newImage = this.imagesRepository.create({
        user,
        image: image.buffer,
    });

    await this.imagesRepository.save(newImage);

    const tagsValues: TagWithCoordinates[] = JSON.parse(tags);
    const imageTags = tagsValues.map((tag) => {
        const { startX, startY, endX, endY, tag: tag_name } = tag;

        return this.imageTagsRepository.create({
            image: newImage,
            tag_name,
            x1_coordinate: startX,
            y1_coordinate: startY,
            x2_coordinate: endX,
            y2_coordinate: endY,
        });
    });

    await this.imageTagsRepository.save(imageTags);

    return { success: true, message: 'Image tags saved successfully.' };
}

async getImagesOfUser(username:string) : Promise<ImageDataType[] | null>{
  const user = await this.getUserByUsername(username);
  if(!user)
    return null;

  return user.my_images.map((img) => {
   return {
    image_index: img.image_index,
    image: base64.fromByteArray(img.image),
  }
  })
}


  getHello(): string {
    return 'Hello World!';
  }
}
