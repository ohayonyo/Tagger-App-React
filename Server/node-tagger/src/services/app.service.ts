import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity';
import {Repository} from 'typeorm'
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository:Repository<User>,

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


  getHello(): string {
    return 'Hello World!';
  }
}
