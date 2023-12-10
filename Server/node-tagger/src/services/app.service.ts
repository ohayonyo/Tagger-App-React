import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity';
import {Repository} from 'typeorm'
import { MulterFile } from 'multer';
import { Image } from 'src/entities/image.entity';
import { ImageTag } from 'src/entities/imageTag.entity';
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
    
    if (user) {
      console.log(user);
    } else {
      console.log('User not found');
    }
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

  async login(username: string, password: string): Promise<{success:boolean,value:string}> {
    const user = await this.usersRepository.findOne({
      where: { username},
    });

    if(!user){
      return {success:false,value:"Username doesn't exists"}
    }

    if(user.password!==password){
      return {success:false,value:'Wrong password'};
    }
  
    await this.usersRepository.update({ username, password }, { is_active: true });
    return {success:true, value:username+' logged in successfully'};
  }


  async saveUserImageTags(username:string,image:MulterFile,tags:string){
    console.log('inside saveUserImageTags');
    const user = await this.getUserByUsername(username);
    if(!image || !image.buffer)
      return false;
    
    const newImage = this.imagesRepository.create({
      user,
    });

    console.log('newImage:',newImage);

    newImage.image = image.buffer;
    newImage.imageTags = [];

    this.imagesRepository.save(newImage);
    
    
    return true;
  }


  getHello(): string {
    return 'Hello World!';
  }
}
