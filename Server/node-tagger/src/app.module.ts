import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UsersController } from './controllers/users/users.controller';
import { DatabaseModule } from './modules/database.module';
import { DatabaseService } from './services/database.service';  // Import the service directly, not the module
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';

@Module({
  imports: [DatabaseModule,TypeOrmModule.forRoot(config)],
  controllers: [AppController, UsersController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}