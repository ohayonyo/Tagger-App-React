import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UsersController } from './controllers/users/users.controller';
import { DatabaseModule } from './modules/database.module';
import { DatabaseService } from './services/database.service';  // Import the service directly, not the module
import { TypeOrmModule } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { User } from './entities/user.entity';

import config from 'ormconfig';
import { Image } from './entities/image.entity';
import { ImageTag } from './entities/imageTag.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([User,Image,ImageTag,Repository])], // Use TypeOrmModule.forFeature to include repositories
  controllers: [AppController, UsersController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}